export const styles = {
  /* 
    Media query
    @media only all and (조건문) {실행문} 으로 동작.
    only: 미디어 쿼리를 지원하는 사용자 에이전트만 미디어 쿼리 구문을 해석하라는 명령이며 생략 가능.
    all: 미디어 쿼리를 해석해야 할 대상 미디어를 선언.
    and: 논리적으로 ‘AND’ 연산을 수행
    아래의 조건문은 사용자 해상도에 관한 조건문
    */
  mobile: '@media all and (max-width: 480px)',
  tablet: '@media all and (min-width:480px) and (max-width:1200px)',
  laptop: '@media all and (min-width: 1200px)',

  /* Colors */
  cyan: 'hsl(178, 100%, 50%)',
  soft_blue: 'hsl(215, 51%, 70%)',
  white: 'hsl(0, 0%, 100%)',
  lynch: 'hsl(211, 12%, 48%)',
  gray: 'hsl(204, 8%, 76%)',
  very_light_blue_main: '#f0f2f5',
  very_dark_blue_main: 'hsl(217, 54%, 11%)',
  very_dark_blue_sub: 'hsl(216, 50%, 16%)',
  very_dark_blue_line: 'hsl(215, 32%, 27%)',
  main_theme: 'hsl(219, 27%, 20%)',
  main_theme_lighter: 'hsl(219, 26%, 46%)',
  main_theme_darker: 'hsl(241, 23%, 11%)',

  /* Typography */
  fw_500: 500,
  fw_700: 700,
  fs_1: 'clamp(0.56rem, calc(0.5rem + 0.16vw), 0.74rem)',
  fs_2: 'clamp(0.62rem, calc(0.56rem + 0.18vw), 0.83rem)',
  fs_3: 'clamp(0.7rem, calc(0.64rem + 0.21vw), 0.93rem)',
  fs_4: 'clamp(0.78rem, calc(0.72rem + 0.23vw), 1.06rem',
  fs_5: 'clamp(0.9rem, calc(0.8rem + 0.26vw), 1.18rem)',
  fs_6: 'clamp(0.99rem, calc(0.91rem + 0.3vw), 1.33rem)',
  fs_7: 'clamp(1.12rem, calc(1.02rem + 0.33vw), 1.5rem)',
  fs_8: 'clamp(1.26rem, calc(1.15rem + 0.37vw), 1.68rem)',
  fs_9: 'clamp(1.42rem, calc(1.3rem + 0.42vw), 1.9rem)',
  fs_10: ' clamp(1.6rem, calc(1.46rem + 0.47vw), 2.13rem)',
  fs_11: ' clamp(1.81rem, calc(1.63rem + 0.53vw), 2.4rem)',
  fs_12: ' clamp(2.03rem, calc(1.84rem + 0.6vw), 2.7rem)',
  fs_13: ' clamp(2.27rem, calc(2.06rem + 0.67vw), 3.04rem)',
  fs_14: ' clamp(2.56rem, calc(2.32rem + 0.76vw), 3.42rem)',
  fs_15: ' clamp(2.88rem, calc(2.62rem + 0.85vw), 3.84rem)',
  fs_16: ' clamp(3.25rem, calc(2.94rem + 0.96vw), 4.32rem)',
  fs_17: ' clamp(3.65rem, calc(3.31rem + 1.08vw), 4.86rem)',
  fs_18: ' clamp(4.11rem, calc(3.73rem + 1.21vw), 5.47rem)',
  fs_19: ' clamp(4.62rem, calc(4.19rem + 1.37vw), 6.16rem)',
  fs_20: ' clamp(5.2rem, calc(4.72rem + 1.54vw), 6.93rem)',
  fs_21: ' clamp(5.84rem, calc(5.31rem + 1.73vw), 7.79rem)',

  /* Space */
  space_1: 'clamp(0.5rem, calc(0.48rem + 0.09vw), 0.61rem)',
  space_2: 'clamp(0.9rem, calc(0.82rem + 0.27vw), 1.2rem)',
  space_3: 'clamp(1.41rem, calc(1.3rem + 0.35vw), 1.81rem)',
  space_4: 'clamp(1.81rem, calc(1.63rem + 0.53vw), 2.4rem)',
  space_5: 'clamp(2.7rem, calc(2.45rem + 0.8vw), 3.6rem)',
  space_6: 'clamp(3.6rem, calc(3.26rem + 1.06vw), 4.8rem)',
  space_7: 'clamp(5.41rem, calc(4.9rem + 1.6vw), 7.2rem)',
  space_8: 'clamp(7.2rem, calc(6.54rem + 2.13vw), 9.6rem)',
  space_9: 'clamp(10.8rem, calc(9.81rem + 3.19vw), 14.4rem)',
  space_10: ' clamp(14.4rem, calc(13.07rem + 4.26vw), 19.2rem)',

  /* One-up pairs */
  space_1_2: 'clamp(0.5rem, calc(0.3rem + 0.62vw), 1.2rem)',
  space_2_3: 'clamp(0.9rem, calc(0.66rem + 0.8vw), 1.81rem)',
  space_3_4: 'clamp(1.41rem, calc(1.12rem + 0.89vw), 2.4rem)',
  space_4_5: 'clamp(1.81rem, calc(1.3rem + 1.6vw), 3.6rem)',
  space_5_6: 'clamp(2.7rem, calc(2.11rem + 1.86vw), 4.8rem)',
  space_6_7: 'clamp(3.6rem, calc(2.61rem + 3.19vw), 7.2rem)',
  space_7_8: 'clamp(5.41rem, calc(4.24rem + 3.72vw), 9.6rem)',
  space_8_9: 'clamp(7.2rem, calc(5.22rem + 6.38vw), 14.4rem)',
  space_9_10: ' clamp(10.8rem, calc(8.48rem + 7.45vw), 19.2rem)',

  /* Radius */
  radius_1: '2px',
  radius_2: '4px',
  radius_3: '6px',
  radius_4: '8px',
  radius_5: '10px',
  radius_6: '12px',
  radius_7: '14px',
  radius_8: '16px',
  radius_9: '18px',
  radius_10: '20px',
  radius_12: '22px',
  radius_13: '24px',
  radius_14: '26px',
  radius_15: '30px',
  radius_16: '40px',
  radius_17: '50px',
  radius_18: '60px',
};
