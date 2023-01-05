$(function()
	{
	//Здесь позволяем отображать контент при выключенном javascript
	$('#main-container-background a[name]').removeAttr("name");
	$('#main-container').css('overflow', 'hidden');
	$('#side-nav').css('visibility', 'visible');
	
	//Здесь назначается обработчик события нажатия кнопки мыши для каждого элемента #side-nav 
	//для перехода в #main-container-background
   $('#side-nav a').live
	('click', function()
		{
		
		$(this).parent().removeClass('remove-right-border');
		$(this).parent().siblings().addClass('remove-right-border');
		
		
		//Здесь задается текст для отображения в строке состояния поверх изображения
		var overlay = new Array("LivePipe: here is the overlay text",
					"Echo: here is the overlay text",
					"Ajax.org: here is the overlay text",
					"Spry: here is the overlay text",
					"QooxDoo: here is the overlay text",
					"jQuery Tools: here is the overlay text");
		//Здесь задается цвет фона для строки сосотояния поверх изображения
		var color	= new Array("#ff0d4c",
					"#0d13ff",
					"#0dff18",
					"#fff10d",
					"#0dcfff",
					"#ff0deb");		
		var index = $('#side-nav a').index(this);
		
		$("#main-container-background").animate({ top: index * -307 }, 'slow');
		$(".overlay").hide().css("background-color", color[index]).text(overlay[index]).fadeIn(1500);
		
		});
	});
	
