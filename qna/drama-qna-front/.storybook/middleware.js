
const configureMiddleware = require('@nara.platform/storybook/storyConfig/configureMiddleware');
const proxy = require('http-proxy-middleware');


module.exports = configureMiddleware(router => {
  //
  // for dev - 수정금지, 로컬설정 필요 시 하단에 router 설정 추가
  router.baseTarget = 'http://35.190.235.222';

  // for local
  router.use('/api/qna', proxy({
    target: 'http://localhost:9030',
    pathRewrite: { '/api/qna': '/' },
    secure: false,
    crossOrigin: true,
  }));
});
