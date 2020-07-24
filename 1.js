function zifu() {
    // 初始化数据
    this.init();
    this.stratYX();
    this.key();
    this.clientW = document.documentElement.clientWidth;
    this.clientH = document.documentElement.clientHeight;

}
zifu.prototype = {
    init() {
        this.letter = ["A", "B", "C", "D", "E", "F"]
        this.divs = []
        this.grade = 0;
        this.life = 10;
        this.over = document.querySelector(".over")
        this.sub = document.querySelector(".sub")
        this.start = document.querySelector(".start")
        this.grade1 = document.querySelector(".grade span")
        this.life1 = document.querySelector(".life span")
        this.top = document.querySelector(".top")
        this.flag = true
        this.speed = 5
        this.num = 3
        this.two = true
        this.three = true
        this.four = true
        this.currPosArr = [];


    },
    check1: function(arr, x, width) {
        for (var i = 0; i < arr.length; i++) {
            if (!(x + width < arr[i].minx || arr[i].maxx + width < x)) {
                return true;
            }
        }
        return false;
    },
    createZifu(num) {
        var cur = []
        this.currPosArr = []
        var that = this

        for (var i = 0; i < num; i++) {
            cur.push(this.letter[Math.floor(this.letter.length * Math.random())])
            var div = document.createElement("div")
            div.innerHTML = cur[i]
            document.body.appendChild(div)
                // var x = Math.floor(Math.random() * 1000 + 300);
            var x = 100 + (this.clientW - 200) * Math.random();
            while (this.check1(this.currPosArr, x, 100)) {
                x = 100 + (this.clientW - 200) * Math.random();
            }
            that.currPosArr.push({ minx: x, maxx: x + 100 });
            div.style.cssText = "backgroundRepeat: no-repeat;background:url(./images/" + cur[i] + ".svg);width:100px;height:110px;float:left; position:absolute; line-height:" + Math.floor(Math.random() * 32 + 16) + "px;text-align: center; font-size: 50px; left:" + x + "px;top:0";

            that.divs.push(div)

        }
    },
    yundong() {

        var that = this
        var sp1 = that.speed
        for (var i = 0; i < that.divs.length; i++) {
            that.divs[i].style.top = that.divs[i].offsetTop + sp1 + "px";

        }
        for (var i = 0; i < that.divs.length; i++) {
            if (400 < that.divs[i].offsetTop) {
                document.body.removeChild(that.divs[i]);
                that.divs.splice(i, 1);
                that.currPosArr.splice(i, 1);
                that.life--
                    that.life1.innerHTML = that.life
                that.createZifu(1);

            }
        }
        if (that.life <= 0) {
            clearInterval(that.t)
                // over.style.background = "red"
                // that.over.innerHTML = "游戏结束"
            that.sub.style.display = "block"
            that.over.style.display = "block"
            document.onkeydown = null;

        }
        if (that.two) {

            if (that.grade > 2) {
                that.speed = 7;
                alert("恭喜进入第二关")
                that.two = false
            }

        }
        if (that.three) {
            if (that.grade > 4) {
                that.speed = 10;
                alert("恭喜进入第三关")
                that.three = false
            }

        }
        if (that.four) {
            if (that.grade > 10) {
                that.speed = 15;
                alert("恭喜进入第四关")
                that.four = false
            }

        }
    },
    _pannel() {

        var that = this
        this.pannel = document.createElement("div")
            // var speed2 = document.createElement("input")
            // speed2.placeholder = "请输入速度"
        var num2 = document.createElement("input")
        num2.placeholder = "请输入字母数量"
        var sub1 = document.createElement("input")
        sub1.type = "submit"
            // this.speed2 = speed2
        this.num2 = num2
        this.sub1 = sub1
            // this.pannel.appendChild(speed2)
        this.pannel.appendChild(num2)

        this.pannel.appendChild(sub1)
        this.pannel.style.cssText = "float:left;position:fixed;top:150px"
        document.body.appendChild(this.pannel)

        this.sub1.onclick = function() {
            console.log(this)
                // var speed2 = that.speed2.value;
            var num2 = that.num2.value;
            // that.speed = speed2;
            that.num = num2;

            that.start.style.display = "none"
            that.createZifu(that.num)
            that.pannel.style.display = "none"

            that.t = setInterval(function() { that.yundong() }, 50);



        }

    },
    stratYX() {
        var that = this
            // 开始游戏 
        that.start.onclick = function() {
                that._pannel()


            }
            //   重新开始
        that.sub.onclick = function() {

                that.key();

                var leng = that.divs.length - 1
                for (var i = leng; i >= 0; i--) {
                    document.body.removeChild(that.divs[i]);
                    that.divs.pop();


                }
                console.log(that.divs)

                that.createZifu(that.num)
                that.t = setInterval(function() { that.yundong() }, 50);
                that.sub.style.display = "none"
                that.life = 10;
                that.speed = 5;
                that.life1.innerHTML = that.life
                    // over.style.display = "none"
            }
            //   暂停游戏
        that.top.onclick = function() {
            if (that.flag) {
                that.flag = false
                clearInterval(that.t)
                that.top.value = "继续开始"
                document.onkeydown = null;

            } else {
                that.t = setInterval(function() { that.yundong() }, 50);
                that.flag = true
                that.top.value = "暂停"
                that.key();
            }
        }







    },

    key() {
        var that = this

        document.onkeydown = function(ev) {
            var letter = String.fromCharCode(ev.keyCode);

            for (var i = 0; i < that.divs.length; i++) {
                if (that.divs[i].innerHTML == letter) {
                    document.body.removeChild(that.divs[i]);

                    that.divs.splice(i, 1);
                    that.createZifu(1);
                    that.grade = that.grade + 1

                    that.grade1.innerHTML = that.grade
                    break;


                }
            }
        }
    }

}