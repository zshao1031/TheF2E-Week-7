//等網頁全部載入後才會執行的程式碼
window.onload = function () 
{
	var screenWidth = window.innerWidth;
	var screenHeight = window.innerHeight;

	var layerBackground = document.getElementById("layer_Background");
	var ctxBackground = layerBackground.getContext("2d");
	layerBackground.width = screenWidth;
	layerBackground.height = screenHeight;

	
	var layerSymbols = document.getElementById("layer_Symbols");
	var ctxSymbols = layerSymbols.getContext("2d");
	layerSymbols.width = screenWidth;
	layerSymbols.height = screenHeight;

	var layerStar = document.getElementById("layer_Star");
	var ctxStar = layerStar.getContext("2d");
	layerStar.width = screenWidth;
	layerStar.height = screenHeight;
	
	//===============================
	// 繪製星星相關設定
	var numStars = 4000; // 要創的星星總數量
	var radius = "0." + Math.floor(Math.random() * 9) + 1;	// 隨機決定半徑
	var focalLength = layerStar.width * 2;	// 焦距
	var warp = 0;	// 經線
	var centerX, centerY;	// 畫面中心的x, y座標

	var stars = [],	star;	// 儲存星星用的
	var i;					// 記錄第幾顆星星

	var animate = true;		// 動畫開關

	//===============================
	// 繪製中央的圓圈、電池、及說明文字等	
	drawLayerBackground();

	// 每0.03秒做一次drawLayerSymbols函式
	setInterval(drawLayerSymbols, 30);

	// 繪製星星動畫用
	// 此方法通知瀏覽器我們想要產生動畫，並且要求瀏覽器在刷新畫面前呼叫特定函數刷新動畫；
	// 這個方法接受一個函數(回撥函數, Callback)，然後該函數會被呼叫執行以刷新繪圖。
	window.requestAnimFrame = (function() 
	{
  		return window.requestAnimationFrame;
	})();
	
	// 初始化單顆星星
	initializeStars();

	// 執行Frame
	executeFrame();	




	//================================================
	// 以下是function
	//================================================

	// 畫出圈圈外轉動的三個幾何圖形
	function drawLayerBackground()
	{
		// 寫出標題文字
		ctxBackground.font = "Bold 16px 'Arial'";
		ctxBackground.fillStyle = "rgb(255, 255, 255)";
		ctxBackground.fillText("Radio Defense", 910, 460);

		// 裡面的圈圈
		ctxBackground.beginPath();
		ctxBackground.arc(960, 500, 120, 0, Math.PI * 2);
		ctxBackground.closePath()												;
		ctxBackground.lineWidth = 3;
		ctxBackground.strokeStyle = "rgba(255,255,255,1)";
		ctxBackground.stroke();

		// 外面的圈圈
		ctxBackground.beginPath();
		ctxBackground.arc(960, 500, 160, 0, Math.PI * 2);
		ctxBackground.closePath();
		ctxBackground.lineWidth = 1;
		ctxBackground.strokeStyle = "rgba(255,255,255,0.27)";
		ctxBackground.stroke();

		// 左下的內容區
		ctxBackground.font = "16px '微軟正黑體'";
		ctxBackground.fillStyle = "rgb(255, 255, 255)";
		ctxBackground.fillText("你身負著運送能量電池的任務", 840, 710);
		ctxBackground.fillText("卻遭到幾何星人的埋伏", 840, 730);
		ctxBackground.fillText("請協助從他們的手中奪回能量電池", 840, 750);

	}

	//================================================
	// 畫出圈圈外轉動的三個幾何圖形
	function drawLayerSymbols()
	{
		ctxSymbols.clearRect( 0 , 0 , screenWidth , screenHeight );
		ctxSymbols.translate( screenWidth / 2 , screenHeight / 2 );
		ctxSymbols.rotate(0.02);
		ctxSymbols.translate( -screenWidth / 2 , -screenHeight / 2 );

		// 畫出橘色的圈圈
		ctxSymbols.beginPath();
		ctxSymbols.arc(560, 500, 26, 0, Math.PI * 2);
		ctxSymbols.closePath();
		ctxSymbols.fillStyle = "rgb(244, 174, 94)";
		ctxSymbols.fill();

		// 畫出藍色三角形
		ctxSymbols.beginPath();
		ctxSymbols.moveTo(776.1, 330.2);
		ctxSymbols.lineTo(741.0, 381.6);
		ctxSymbols.lineTo(802.7, 387.6);
		ctxSymbols.lineTo(776.1, 330.2);
		ctxSymbols.closePath();
		ctxSymbols.fillStyle = "rgb(53, 117, 186)";
		ctxSymbols.fill();

		// 畫出紅寶石
		ctxSymbols.beginPath();
		ctxSymbols.moveTo(637.9, 421.2);
		ctxSymbols.lineTo(607.8, 431.3);
		ctxSymbols.lineTo(621.0, 460.8);
		ctxSymbols.lineTo(652.5, 471.9);
		ctxSymbols.lineTo(653.9, 472.3);
		ctxSymbols.lineTo(667.4, 450.1);
		ctxSymbols.lineTo(665.1, 431.5);
		ctxSymbols.lineTo(637.9, 421.2);
		ctxSymbols.closePath();
		ctxSymbols.fillStyle = "rgb(230, 69, 92)";
		ctxSymbols.fill();

	}

	//================================================

	// 初始化單顆星星
	function initializeStars()
	{
		centerX = layerStar.width / 2;	// 中心點的X座標
	  	centerY = layerStar.height / 2;	// 中心點的Y座標

		stars = [];	// 星星陣列，用來儲存星星

		// 創建numStars顆星星
		for (i = 0; i < numStars; i++) 
		{
	    	star = 
	    	{
	    		x: Math.random() * layerStar.width,		
	    		y: Math.random() * layerStar.height,	
		    	z: Math.random() * layerStar.width,		
	    		o: "0." + Math.floor(Math.random() * 99) + 1
	    	};
	    	
	    	stars.push(star);	// 將星星加到陣列中
		}
	}

	// 移動星星
	function moveStars()
	{
		for (i = 0; i < numStars; i++) 
		{
	    	star = stars[i];
	    	star.z--;

	    	if (star.z <= 0) 
	    	{
	    		star.z = layerStar.width;
	    	}
		}
	}


	// 繪製星星
	function drawStars()
	{
		var pixelX, pixelY, pixelRadius;

	  	if (warp == 0) 
	  	{
	    	ctxStar.fillStyle = "#001D2E";
	    	ctxStar.fillRect(0, 0, layerStar.width, layerStar.height);
	  	}

	  	ctxStar.fillStyle = "rgba(251, 251, 251, " + radius + ")";
	  	
	  	for (i = 0; i < numStars; i++) 
	  	{
	    	star = stars[i];

	    	pixelX = (star.x - centerX) * (focalLength / star.z);
	    	pixelX += centerX;
	    	pixelY = (star.y - centerY) * (focalLength / star.z);
	    	pixelY += centerY;
	    	pixelRadius = 0.4 * (focalLength / star.z);

	    	ctxStar.fillRect(pixelX, pixelY, pixelRadius, pixelRadius);
	    	ctxStar.fillStyle = "rgba(251, 251, 251, " + star.o + ")";
	    }
	}

	//===========================
	// 開始運行星星動畫
	function executeFrame() 
	{
		// 如果星星動畫的開關是開啟的
		if (animate) 
		{
			requestAnimFrame(executeFrame);
		}

		moveStars();	// 移動星星
		drawStars();	// 繪製星星
	}

}


