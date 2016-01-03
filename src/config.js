/*

 * 整个框架的配置文件
 * 
 * 
 * */
define(function () {
	var dir = Speed.dir;
	require.config({
		waitSeconds			: 20,
		shim							: {},
		paths						: {
			/*3lib*/
			$							: dir + '3lib/zepto',
			FastClick			: dir + '3lib/fastclick',
			text					: dir + '3lib/require.text',
      Class         : dir + '3lib/class',

			/*common*/
			UA						: dir + 'common/ua',
			/*core*/
			appInit				: dir + 'core/app.init',
      container     : dir + 'core/container'
		}
	});
});