//下雪函数
(function() {
				var winW = window.innerWidth;
				var winH = window.innerHeight;
				var num = 500;
				var snowArray = new Array();

				function random(min, max, isInt) {
					var a = min + Math.random() * (max - min);
					return isInt ? parseInt(a) : a;
				}
				function Snow() {
					this.init();
					this.draw();
				}
				Snow.prototype.init = function() {
					this.x = random(0, winW, true);
					this.y = random(-winH, 0, true);
					this.speed = random(0.5, 3);
					this.wind = random(-2, 2);
					this.size = random(3, 6, true);
					this.alpha = random(0.2, 1);
				}
				Snow.prototype.draw = function() {
					this.o = document.createElement("div");
					this.o.className = "snow";
					document.body.appendChild(this.o);
					this.o.style.width = this.o.style.height = this.size + "px";
					this.o.style.opacity = this.alpha;
				}
				Snow.prototype.update = function() {
					this.x += this.wind;
					this.y += this.speed;

					if(this.y > winH) {
						this.init();
					}

					this.o.style.left = this.x + "px";
					this.o.style.top = this.y + "px";
				}
				for(var i = 0; i < num; i++) {
					var snow = new Snow();
					snowArray.push(snow);
				}
				(function() {
					for(var i = 0; i < snowArray.length; i++) {
						snowArray[i].update();
					}
					requestAnimationFrame(arguments.callee);
				}());
			}());