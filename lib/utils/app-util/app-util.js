AppUtil = {
  temp: new ReactiveDict(null, {}),//data taşımak
  refreshTokens: new ReactiveDict(null, {}),//autorunları tekrar çalıştırmak için

  reset: function () {
    AppUtil.temp.clear();
    AppUtil.refreshTokens.clear();
  }
};
