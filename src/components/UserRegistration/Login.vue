<template>

<div class="user_reg">
    <div class="user_login_captcha"  v-show="slidercaptcha" >
            <div class="captcha_wrp">
            <button type="button" @click="closeSlider" class="close puzzle_close">&times;</button>
                <p>Drag to verify</p>
              <div id="captcha"></div>
              </div>
    </div>
    <v-content class="new_login_bg mobile_view">
        <v-col cols="12" class="reg_logo">
            <a :href="`${websiteUrl}`">
                <img src="../../assets/images/login-logo.png" alt="Brexily Exchange" height="100">
            </a>
        </v-col>
        <v-container class="pa-0">

            <div class="new_login_wrp">
                <div class="userregistration_box">
                    <ul>
                        <li>
                            <a href="/login" class="radius_left activeTab">Sign in</a>
                        </li>
                        <li>
                            <a href="/signup" class="radius_right">Sign up</a>
                        </li>
                    </ul>
                    <div class="userregistration_contentbox">
                        <div class="signin_wrp" v-show="loginBlock">
                            <template>
                                <div>
                                    <div class="box_title_bg">
                                        <div class="box_title">
                                            <p>Welcome Back</p>
                                            <h1 class="f40">SIGN IN!</h1>
                                        </div>
                                    </div>
                                    <!-- Login Form section -->
                                    <div class="userregistration_form_wrp">
                                        <v-form ref="form" v-model="valid">
                                            <v-col cols="12" sm="12" class="p-0">
                                                <div class="form-group">
                                                    <p>Email Address</p>
                                                    <v-text-field v-model="email" :rules="emailRules" placeholder="Enter your email address" single-line outlined required hide-details="auto">
                                                    </v-text-field>
                                                </div>
                                                <router-link to="/RecoverPassword" class="forgot_psw">Forgot Password</router-link>
                                            </v-col>
                                            <v-col cols="12" sm="12" class="p-0">
                                                <div class="form-group">
                                                    <p>Password</p>
                                                    <v-text-field v-model="password" placeholder="Password" :append-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'" @click:append="() => (show1 = !show1)" :type="show1 ? 'password' : 'text'" :rules="passwordRules" @input="_=>password=_" single-line outlined required>
                                                    </v-text-field>
                                                </div>
                                            </v-col>

                                            <v-col cols="12" sm="12" class="p-0">
                                                <div class="form-group position-relative">
                                                    <p></p>
                                                    <div id="g-recaptcha" class="g-recaptcha" 
                                                    :data-sitekey="sitekey"
                                                    style="transform:scale(0.85);-webkit-transform:scale(0.85);transform-origin:0 0;-webkit-transform-origin:0 0;"
                                            ></div>
                                                    <div id="g-recaptcha-error" class="red_txt f12"></div>
                                                </div>
                                            </v-col>                                            
                                      
                                            <v-col cols="12" sm="12" class="p-0">
                                                <v-alert v-show="loginerr" dense outlined type="error" class="alert_txt">
                                                    {{ errorMsg }}
                                                </v-alert>
                                                <v-btn @click="validate" x-large color="success" class="w-100" dark>Continue to exchange</v-btn>
                                            </v-col>
                                        </v-form>
                                    </div>
                                    <!-- End Login Form section -->
                                </div>
                            </template>
                        </div>
                        <div v-show="!loginBlock">
                            <div class="box_title_bg">
                                <div class="box_title">
                                    <p>Two-factor</p>
                                    <h1 class="f30">Google<br />Authenticator</h1>
                                </div>
                            </div>

                            <!-- Login Form section -->
                            <div class="userregistration_form_wrp">
                                <v-form ref="form1">
                                    <v-col cols="12" sm="12" class="p-0 text-center">
                                        <img src="../../assets/images/google-2fa.png" alt="" width="70" class="mb-6">
                                        <div class="form-group text-center">
                                            <v-text-field  autofocus v-model="verifyCode" :rules="twofaRules" label="2FA Code" required single-line outlined class="verify_code" hide-details="auto" maxlength="6" id="login_twofa"  v-on:keyup="getAttributeLength">
                                            </v-text-field>
                                        </div>
                                        <v-alert v-show="twofaerr" dense outlined type="error" class="alert_txt">
                                            {{ twofaerrorMsg }}
                                        </v-alert>
                                    </v-col>
                                    <p class="twofa_txt">Enter the 2-step verification code provided by Google Authenticator app</p>

                                </v-form>
                            </div>
                            <!-- End Login Form section -->
                        </div>
                    </div>
                </div>

                <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
                    {{ snackbar_text }}
                    <v-icon @click="snackbar = false" class="close_snak">mdi-close</v-icon>
                    <!-- <v-btn dark text @click="snackbar = false" style="color: #000;">
                        Close
                    </v-btn> -->
                </v-snackbar>

                <div class="loginbox_footer">
                    <a :href="`${websiteUrl}termsofuse`">Terms &amp; Conditions</a> | <a :href="`${websiteUrl}privacypolicy`">Privacy Policy</a><br />
                    Copyright © 2020 Everus Technologies OÜ. All rights reserved.
                </div>
            </div>

            <v-overlay style="z-index:205" :value="overlay">
           <!-- <v-img src="../../../assets/images/loader.png" width="60" height="60"></v-img>-->
            <div>
          <div class="multi-spinner-container">
            <div class="multi-spinner">
              <div class="multi-spinner">
                <div class="multi-spinner">
                  <div class="multi-spinner">
                    <div class="multi-spinner">
                      <div class="multi-spinner">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </v-overlay>
        </v-container>
    </v-content>
</div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import $ from 'jquery';
export default {
    name: 'Login',
    components: {},
    data() {
        return {
            sitekey: "6LcpGOIZAAAAACWYU_W9NakfOT9c61yteDZwocml",
            widgetId: 0,
            overlay: false,
            zIndex: 0,
            mode: '',
            drawer: true,
            loginerr: false,
            twofaerr: false,
            loginBlock: true,
            verifyCode: '',
            twofaerrorMsg: '',
            show1: true,
            valid: true,
            errorMsg: '',
            // email
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'Provide valid E-mail Id',
            ],
            // password
            password: "",
            passwordRules: [
                v => !!v || "Password is required"
            ],
            twofaRules: [
                v => !!v || "2-step verification code is required"
            ],
            snackbar: false,
            snackbar_text: "",
            vertical: true,
            timeout: 6000,
            color: "yellow",
            x: 'right',
            y: 'top',
            websiteUrl: '',
            slidercaptcha: false,
            pastedCode: '',
            isLoginDone: false,
            country: "",
            city: "",
            region: "",
            ipaddr: "",
            browser: "",
        }
    },
    mounted: function () {
        this.render()

        function setInputFilter(textbox, inputFilter) {
            [ "input", "focus", "keypress","keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
                textbox.addEventListener(event, function() {
                if (inputFilter(this.value)) {
                    this.oldValue = this.value;
                    this.oldSelectionStart = this.selectionStart;
                    this.oldSelectionEnd = this.selectionEnd;
                } else if (this.hasOwnProperty("oldValue")) {
                    this.value = this.oldValue;
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                } else {
                    this.value = "";
                }
                
                });
            });
            }       
               
            setInputFilter(document.getElementById("login_twofa"), function(value) {
  return /^-?\d*$/.test(value); });

        $(document).ready(function () {
            'use strict';

            var SliderCaptcha = function (element, options) {
                this.$element = $(element);
                this.options = $.extend({}, SliderCaptcha.DEFAULTS, options);
                this.$element.css({ 'position': 'relative', 'width': this.options.width + 'px', 'margin': '0 auto' });
                this.init();
            };

            SliderCaptcha.VERSION = '1.0';
            SliderCaptcha.Author = 'argo@163.com';
            SliderCaptcha.DEFAULTS = {
                width: 280,     // canvas宽度
                height: 155,    // canvas高度
                PI: Math.PI,
                sliderL: 42,    // 滑块边长
                sliderR: 9,     // 滑块半径
                offset: 5,      // 容错偏差
                loadingText: '正在加载中...',
                failedText: '再试一次',
                barText: '向右滑动填充拼图',
                repeatIcon: 'fa fa-repeat',
                maxLoadCount: 3,
                localImages: function () {
                    return 'images/Pic' + Math.round(Math.random() * 4) + '.jpg';
                },
                verify: function (arr, url) {
                    var ret = false;
                    $.ajax({
                        url: url,
                        data: JSON.stringify(arr),
                        async: false,
                        cache: false,
                        type: 'POST',
                        contentType: 'application/json',
                        dataType: 'json',
                        success: function (result) {
                            ret = result;
                        }
                    });
                    return ret;
                },
                remoteUrl:null
                //remoteUrl: process.env.VUE_APP_API_URL +"sliderCaptcha"
            };

            function Plugin(option) {
                return this.each(function () {
                    var $this = $(this);
                    var data = $this.data('lgb.SliderCaptcha');
                    var options = typeof option === 'object' && option;

                    if (data && !/reset/.test(option)) return;
                    if (!data) $this.data('lgb.SliderCaptcha', data = new SliderCaptcha(this, options));
                    if (typeof option === 'string') data[option]();
                });
            }

            $.fn.sliderCaptcha = Plugin;
            $.fn.sliderCaptcha.Constructor = SliderCaptcha;

            var _proto = SliderCaptcha.prototype;
            _proto.init = function () {
                this.initDOM();
                this.initImg();
                this.bindEvents();
            };

            _proto.initDOM = function () {
                var createElement = function (tagName, className) {
                    var elment = document.createElement(tagName);
                    elment.className = className;
                    return elment;
                };

                var createCanvas = function (width, height) {
                    var canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    return canvas;
                };

                var canvas = createCanvas(this.options.width - 2, this.options.height); // 画布
                var block = canvas.cloneNode(true); // 滑块
                var sliderContainer = createElement('div', 'sliderContainer');
                var refreshIcon = createElement('i', 'refreshIcon ' + this.options.repeatIcon);
                var sliderMask = createElement('div', 'sliderMask');
                var sliderbg = createElement('div', 'sliderbg');
                var slider = createElement('div', 'slider');
                var sliderIcon = createElement('i', 'fa fa-arrow-right sliderIcon');
                var text = createElement('span', 'sliderText');

                block.className = 'block';
                text.innerHTML = this.options.barText;

                var el = this.$element;
                el.append($(canvas));
                el.append($(refreshIcon));
                el.append($(block));
                slider.appendChild(sliderIcon);
                sliderMask.appendChild(slider);
                sliderContainer.appendChild(sliderbg);
                sliderContainer.appendChild(sliderMask);
                sliderContainer.appendChild(text);
                el.append($(sliderContainer));

                var _canvas = {
                    canvas: canvas,
                    block: block,
                    sliderContainer: $(sliderContainer),
                    refreshIcon: refreshIcon,
                    slider: slider,
                    sliderMask: sliderMask,
                    sliderIcon: sliderIcon,
                    text: $(text),
                    canvasCtx: canvas.getContext('2d'),
                    blockCtx: block.getContext('2d')
                };

                if ($.isFunction(Object.assign)) {
                    Object.assign(this, _canvas);
                }
                else {
                    $.extend(this, _canvas);
                }
            };

            _proto.initImg = function () {
                var that = this;
                var isIE = window.navigator.userAgent.indexOf('Trident') > -1;
                var L = this.options.sliderL + this.options.sliderR * 2 + 3; // 滑块实际边长
                var drawImg = function (ctx, operation) {
                    var l = that.options.sliderL;
                    var r = that.options.sliderR;
                    var PI = that.options.PI;
                    var x = that.x;
                    var y = that.y;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
                    ctx.lineTo(x + l, y);
                    ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
                    ctx.lineTo(x + l, y + l);
                    ctx.lineTo(x, y + l);
                    ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
                    ctx.lineTo(x, y);
                    ctx.lineWidth = 2;
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
                    ctx.stroke();
                    ctx[operation]();
                    ctx.globalCompositeOperation = isIE ? 'xor' : 'destination-over';
                };

                var getRandomNumberByRange = function (start, end) {
                    return Math.round(Math.random() * (end - start) + start);
                };
                var img = new Image();
                img.crossOrigin = "Anonymous";
                var loadCount = 0;
                img.onload = function () {
                    // 随机创建滑块的位置
                    that.x = getRandomNumberByRange(L + 10, that.options.width - (L + 10));
                    that.y = getRandomNumberByRange(10 + that.options.sliderR * 2, that.options.height - (L + 10));
                    drawImg(that.canvasCtx, 'fill');
                    drawImg(that.blockCtx, 'clip');

                    that.canvasCtx.drawImage(img, 0, 0, that.options.width - 2, that.options.height);
                    that.blockCtx.drawImage(img, 0, 0, that.options.width - 2, that.options.height);
                    var y = that.y - that.options.sliderR * 2 - 1;
                    var ImageData = that.blockCtx.getImageData(that.x - 3, y, L, L);
                    that.block.width = L;
                    that.blockCtx.putImageData(ImageData, 0, y + 1);
                    that.text.text(that.text.attr('data-text'));
                };
                img.onerror = function () {
                    loadCount++;
                    if (window.location.protocol === 'file:') {
                        loadCount = that.options.maxLoadCount;
                        console.error("can't load pic resource file from File protocal. Please try http or https");
                    }
                    if (loadCount >= that.options.maxLoadCount) {
                        that.text.text('加载失败').addClass('text-danger');
                        return;
                    }
                    img.src = that.options.localImages();
                };
                img.setSrc = function () {
                    var src = '';
                    loadCount = 0;
                    that.text.removeClass('text-danger');
                    if ($.isFunction(that.options.setSrc)) src = that.options.setSrc();
                    if (!src || src === '') src = 'https://picsum.photos/' + that.options.width + '/' + that.options.height + '/?image=' + Math.round(Math.random() * 20);
                    if (isIE) { // IE浏览器无法通过img.crossOrigin跨域，使用ajax获取图片blob然后转为dataURL显示
                        var xhr = new XMLHttpRequest();
                        xhr.onloadend = function (e) {
                            var file = new FileReader(); // FileReader仅支持IE10+
                            file.readAsDataURL(e.target.response);
                            file.onloadend = function (e) {
                                img.src = e.target.result;
                            };
                        };
                        xhr.open('GET', src);
                        xhr.responseType = 'blob';
                        xhr.send();
                    } else img.src = src;
                };
                img.setSrc();
                this.text.attr('data-text', this.options.barText);
                this.text.text(this.options.loadingText);
                this.img = img;
            };

            _proto.clean = function () {
                this.canvasCtx.clearRect(0, 0, this.options.width, this.options.height);
                this.blockCtx.clearRect(0, 0, this.options.width, this.options.height);
                this.block.width = this.options.width;
            };

            _proto.bindEvents = function () {
                var that = this;
                this.$element.on('selectstart', function () {
                    return false;
                });

                $(this.refreshIcon).on('click', function () {
                    that.text.text(that.options.barText);
                    that.reset();
                    if ($.isFunction(that.options.onRefresh)) that.options.onRefresh.call(that.$element);
                });

                var originX, originY, trail = [],
                    isMouseDown = false;

                var handleDragStart = function (e) {
                    if (that.text.hasClass('text-danger')) return;
                    originX = e.clientX || e.touches[0].clientX;
                    originY = e.clientY || e.touches[0].clientY;
                    isMouseDown = true;
                };

                var handleDragMove = function (e) {
                    if (!isMouseDown) return false;
                    var eventX = e.clientX || e.touches[0].clientX;
                    var eventY = e.clientY || e.touches[0].clientY;
                    var moveX = eventX - originX;
                    var moveY = eventY - originY;
                    if (moveX < 0 || moveX + 40 > that.options.width) return false;
                    that.slider.style.left = (moveX - 1) + 'px';
                    var blockLeft = (that.options.width - 40 - 20) / (that.options.width - 40) * moveX;
                    that.block.style.left = blockLeft + 'px';

                    that.sliderContainer.addClass('sliderContainer_active');
                    that.sliderMask.style.width = (moveX + 4) + 'px';
                    trail.push(Math.round(moveY));
                };

                var handleDragEnd = function (e) {
                    if (!isMouseDown) return false;
                    isMouseDown = false;
                    var eventX = e.clientX || e.changedTouches[0].clientX;
                    if (eventX === originX) return false;
                    that.sliderContainer.removeClass('sliderContainer_active');
                    that.trail = trail;
                    var data = that.verify();
                    if (data.spliced && data.verified) {
                        that.sliderContainer.addClass('sliderContainer_success');
                        if ($.isFunction(that.options.onSuccess)) that.options.onSuccess.call(that.$element);
                    } else {
                        that.sliderContainer.addClass('sliderContainer_fail');
                        if ($.isFunction(that.options.onFail)) that.options.onFail.call(that.$element);
                        setTimeout(function () {
                            that.text.text(that.options.failedText);
                            that.reset();
                        }, 1000);
                    }
                };

                this.slider.addEventListener('mousedown', handleDragStart);
                this.slider.addEventListener('touchstart', handleDragStart);
                document.addEventListener('mousemove', handleDragMove);
                document.addEventListener('touchmove', handleDragMove);
                document.addEventListener('mouseup', handleDragEnd);
                document.addEventListener('touchend', handleDragEnd);

                document.addEventListener('mousedown', function () { return false; });
                document.addEventListener('touchstart', function () { return false; });
                document.addEventListener('swipe', function () { return false; });
            };

            _proto.verify = function () {
                var arr = this.trail; // 拖动时y轴的移动距离
                var left = parseInt(this.block.style.left);
                var verified = false;
                if (this.options.remoteUrl !== null) {
                    verified = this.options.verify(arr, this.options.remoteUrl);
                }
                else {
                    var sum = function (x, y) { return x + y; };
                    var square = function (x) { return x * x; };
                    var average = arr.reduce(sum) / arr.length;
                    var deviations = arr.map(function (x) { return x - average; });
                    var stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
                    verified = stddev !== 0;
                }
                return {
                    spliced: Math.abs(left - this.x) < this.options.offset,
                    verified: verified
                };
            };

            _proto.reset = function () {
                this.sliderContainer.removeClass('sliderContainer_fail sliderContainer_success');
                this.slider.style.left = 0;
                this.block.style.left = 0;
                this.sliderMask.style.width = 0;
                this.clean();
                this.text.attr('data-text', this.text.text());
                this.text.text(this.options.loadingText);
                this.img.setSrc();
            };
        });
    var self = this
        $( document ).ready(function() {
            $('#captcha').sliderCaptcha({
                loadingText: 'Loading...',
                failedText: 'Try It Again',
                barText: 'Slide the Puzzle',
                repeatIcon: 'fa fa-redo',
                onSuccess: function () {                    
                   self.getTwofaStatus()
                }
            });
        });

        this.websiteUrl = process.env.VUE_APP_WEBSITE_URL
    },
    methods: {
        execute () {
            window.grecaptcha.execute(this.widgetId)
        },
        reset () {
            window.grecaptcha.reset(this.widgetId)
        },
        render () {
            if (window.grecaptcha) {
                this.widgetId = window.grecaptcha.render('g-recaptcha', {
                sitekey: this.sitekey,
                size: 'invisible',
                // the callback executed when the user solve the recaptcha
                callback: (response) => {
                    // emit an event called verify with the response as payload
                    this.$emit('verify', response)
                    // reset the recaptcha widget so you can execute it again
                    this.reset() 
                }
                })
            }
        },
        closeSlider() {
            $('body').css('overflow-y','')
            this.slidercaptcha = false
        },
        validate() {
            if (this.$refs.form.validate()) {
                //$('body').css('overflow-y','hidden')
                //this.slidercaptcha = true
                this.getTwofaStatus();
            }
        },
        isNumber: function (event) {
            event = (event) ? event : window.event;
            var charCode = (event.which) ? event.which : event.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
                event.preventDefault();
               // return false;
            } else {
                return true;
            }
        },
         isPaste: function() {
            this.pastedCode = "paste"
        },
        getAttributeLength: function () {
            let newStr = this.verifyCode
            this.verifyCode = newStr.replace(/[^0-9]+/g, "");
            var maxlength = event.target.getAttribute('maxlength');            
            let verifyCode = this.verifyCode    
            
            if (maxlength == verifyCode.length && this.isLoginDone == false) {
                this.login();
            } else {
                this.twofaerrorMsg = ''
                this.twofaerr = false
            }
        },
        getPastedCodeLength: function () {
            let verifyCode = event.clipboardData.getData('text')       
            this.pastedCode = verifyCode  
            this.twofaerrorMsg = ''
            this.twofaerr = false            

            this.login();
        },
        getTwofaStatus: function () {
            $('body').css('overflow-y','')
            var self = this;
            let email = this.email
            let password = this.password            
            const apiUrl = process.env.VUE_APP_API_URL + 'twofa_status';
            let bodyFormData = {
                "email": email,
                "password": password
            }
            var recaptcha_token = $("#g-recaptcha-response").val() || "";
            var googleVerify = false;            
            if(recaptcha_token.length == 0){
                $("#g-recaptcha-error").html("Captcha is required");
                googleVerify = true                
            }else{
                $("#g-recaptcha-error").html("");
                googleVerify = true
            }
            if(googleVerify == true){
            axios({
                    method: 'post',
                    url: apiUrl,
                    data: qs.stringify(bodyFormData),
                })
                .then(function (response) {
                    //handle success 
                    //self.slidercaptcha = false
                    if (response.data.Success == true) {
                        if (response.data.Result.result == 'A') {
                            self.loginBlock = false;
                        } else {
                            self.login();
                        }
                    } else {
                        //$('.refreshIcon').click();
                        self.loginerr = true
                        self.errorMsg = response.data.Result.msg
                    }
                })
                .catch(function (err) {
                    //handle error
                    //self.slidercaptcha = false
                    //$('.refreshIcon').click();
                    self.loginerr = true
                    self.errorMsg = err.response.data.Result.msg
                });
            }
        },
        login: function () {
            this.isLoginDone = true
            var self = this;
            self.overlay = true        
           
            axios({
                method: 'post',
                url: 'https://ipapi.co/json/'
            })
            .then(function (response) {
                self.country = response.data.country_name
                self.city = response.data.city
                self.region = response.data.region
                self.ipaddr = response.data.ip
                self.browser = self.$browserDetect.meta.name
                self.loginapi();
            })
            .catch(function () {
                self.country = ""
                self.city = ""
                self.region = ""
                self.ipaddr = ""
                self.browser = ""
                self.loginapi();
            })
                
        },
        loginapi: function(){
            var self = this;
            let email = self.email
            let password = self.password
            let verifyCode = self.verifyCode
            let country = self.country
            let city = self.city
            let region = self.region
            let ipaddr = self.ipaddr
            let browser = self.browser
            var recaptcha_token = $("#g-recaptcha-response").val() || "";
            var googleVerify = false;            
            if(recaptcha_token.length == 0){
               self.overlay = false
                $("#g-recaptcha-error").html("Captcha is required");
                googleVerify = true                
            }else{
                $("#g-recaptcha-error").html("");
                googleVerify = true
            }
            if(googleVerify == true){
            self.$store.dispatch('login', {
                    email,
                    password,
                    verifyCode,
                    country,
                    city,
                    region,
                    ipaddr,
                    browser,
                    recaptcha_token
                })
                .then(response => {
                    self.overlay = false
                    if (response.data.Success == true) {
                        
                        self.snackbar_text = "Successfully Login to the Brexily"
                        self.snackbar = true
                        //location.href = '/Trade/'+response.data.data.market_symbol;
                        location.href = '/Dashboard';

                    } else {
                        self.isLoginDone = false
                        self.twofaerr = true
                        self.twofaerrorMsg = response.data.Result.msg
                        
                    }

                })
                .catch(err => {
                    self.isLoginDone = false
                    self.overlay = false
                    self.twofaerr = true
                    self.twofaerrorMsg = err.response.data.Result.msg
                    self.loginerr = true
                    self.errorMsg = err.response.data.Result.msg
                    
                })
            }
        }
    }
};
</script>

<style lang="css" scoped>
.theme--dark.v-application {
    background-color: #ffffff !important;
}
</style>
