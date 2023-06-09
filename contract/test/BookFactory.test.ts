import { expect } from 'chai';
import { ethers } from 'hardhat';
import {
  BookFactory as IBookFactory,
  BookFactory__factory,
  Book as IBook,
  Book__factory,
} from '../typechain-types';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

describe('BookFactory', function () {
  /*
  * evm_snapshot
  Snapshot the state of the blockchain at the current block.
  Returns the id of the snapshot that was created. 

  * evm_revert
  Takes the id of the snapshot as an argument.
  Set the state of the blockchain as snapshot. 
  */

  let BookFactory: BookFactory__factory;
  let bookFactory: IBookFactory;
  let Book: Book__factory;
  let bookContract: IBook;
  let snapshotId: any;

  // accounts
  let deployer, writer: SignerWithAddress, notWriter: SignerWithAddress;

  const ERR_NOT_AUTHORIZED = 'Not AUTHORized!';
  const ERR_TOKEN_NON_EXISTS = 'ERC721URIStorage: URI set of nonexistent token';

  before(async () => {
    BookFactory = await ethers.getContractFactory('BookFactory');
    bookFactory = await BookFactory.deploy();
    await bookFactory.deployed();

    Book = await ethers.getContractFactory('Book');

    const [owner, addr1, addr2] = await ethers.getSigners();
    deployer = owner;
    writer = addr1;
    notWriter = addr2;

    console.log(`
    Accounts
    -----------------------------------------------------------
    Contract Addr : ${bookFactory.address}
    Deployer Addr : ${deployer.address}
    Writer   Addr : ${writer.address}
    `);
  });

  beforeEach(async () => {
    snapshotId = await ethers.provider.send('evm_snapshot', []);
  });

  afterEach(async () => {
    await ethers.provider.send('evm_revert', [snapshotId]);
  });

  const publish = async (title: string) => {
    let bookId: number | undefined = undefined;
    let book: string | undefined = undefined;

    const tx = await bookFactory.connect(writer).publish(title);
    const receipt = await tx.wait();
    const publishEvent = receipt.events?.filter((e) => {
      return e.event === 'Publish';
    })[0];
    const args = publishEvent?.args;
    if (args) {
      bookId = +args.bookId;
      book = args.book;
    }

    return { bookId, book };
  };

  describe('Book Factory', function () {
    it('Should emit the right event with args', async () => {
      await expect(bookFactory.connect(writer).publish('Sample Title')).to.emit(
        bookFactory,
        'Publish',
      );
    });

    it('Should set the right address of Book Contract', async () => {
      let bookAddr: string = '';
      const { bookId, book } = await publish('Sample Title');
      if (bookId !== undefined) {
        bookAddr = await bookFactory.books(bookId);
      }

      expect(bookAddr).to.equal(book);
    });

    it('Should set the right ownedBook', async () => {
      const { bookId, book } = await publish('Sample Title');
      const ownedBook = await bookFactory.ownedBook(writer.address);

      expect(book).to.equal(ownedBook[ownedBook.length - 1]);
    });
  });

  describe('Book', function () {
    const SAMPLE_TITLE = 'Sample Title';
    const SAMPLE_TOKEN_URI =
      'https://ipfs.io/ipfs/bafybeifjo6jp6zvxudgvrtlrrupcgl4qrn6li4nu7di2uyhk73mt2qbccy';

    const write = async (tokenURI: string) => {
      const tx = await bookContract.connect(writer).write(tokenURI);
      const receipt = await tx.wait();
      const writeEvent = receipt.events?.filter((e) => {
        return e.event === 'Write';
      })[0];
      const page = writeEvent?.args;
      return page;
    };

    beforeEach(async () => {
      const { book } = await publish(SAMPLE_TITLE);
      if (book) {
        bookContract = Book.attach(book);
      }
    });

    describe('Publish', function () {
      it('Should set the right author', async () => {
        const author = await bookContract.author();

        expect(author).to.equal(writer.address);
      });

      it('Should set the right title', async () => {
        const title = await bookContract.name();

        expect(title).to.equal(SAMPLE_TITLE);
      });
    });

    describe('Write', function () {
      it('Should emit the right event with args', async () => {
        await expect(
          bookContract.connect(writer).write(SAMPLE_TOKEN_URI),
        ).to.emit(bookContract, 'Write');
      });

      it('Should set the right token URI', async () => {
        let tokenURI = '';
        const page = await write(SAMPLE_TOKEN_URI);
        if (page !== undefined) {
          tokenURI = await bookContract.tokenURI(+page);
        }
        expect(tokenURI).to.equal(SAMPLE_TOKEN_URI);
      });

      it('Should revert when not authorized', async () => {
        await expect(
          bookContract.connect(notWriter).write(SAMPLE_TOKEN_URI),
        ).to.be.revertedWith(ERR_NOT_AUTHORIZED);
      });
    });

    describe('Rewrite', function () {
      const NEW_TOKEN_URI =
        'https://ipfs.io/ipfs/QmXfo3dP665Km2eTEVVVPyiy9tX6TS4Q7Gmp4TPrV1RKnq/100';
      let page: number;
      beforeEach(async () => {
        const newPage = await write(SAMPLE_TOKEN_URI);
        if (newPage !== undefined) {
          page = +newPage;
        }
      });

      it('Should emit the right event with args', async () => {
        await expect(
          bookContract.connect(writer).rewrite(page, NEW_TOKEN_URI),
        ).to.emit(bookContract, 'Rewrite');
      });

      it('Should set the right token URI', async () => {
        await bookContract.connect(writer).rewrite(page, NEW_TOKEN_URI);
        const tokenURI = await bookContract.tokenURI(page);
        expect(tokenURI).to.equal(NEW_TOKEN_URI);
      });

      it('Should revert when not authorized', async () => {
        await expect(
          bookContract.connect(notWriter).rewrite(page, NEW_TOKEN_URI),
        ).to.be.revertedWith(ERR_NOT_AUTHORIZED);
      });

      it('Should revert when page not exists', async () => {
        await expect(
          bookContract.connect(writer).rewrite(100, NEW_TOKEN_URI),
        ).to.be.revertedWith(ERR_TOKEN_NON_EXISTS);
      });
    });
  });
});
