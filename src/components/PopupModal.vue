<template>
  <v-row justify="center">
    <v-dialog v-model="showModal" persistent max-width="290">
      <v-card>
        <div class="slidercaptcha card"> 
                <button type="button" class="close puzzle_close" data-dismiss="modal">&times;</button>
                <div class="card-header">
                    <span>Drag To Verify</span>
                </div>
                <div class="card-body">
                    <div id="captcha"></div>
                </div>
            </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
 //import $ from 'jquery'
  export default {
    data () {
      return {
        showModal: true,
      }
    },
    mounted:function(){
      this.addSomethingInJquery()
    },
    methods: {
        addSomethingInJquery () {
           $('#captcha').sliderCaptcha({
                loadingText: 'Loading...',
                failedText: 'Try It Again',
                barText: 'Slide the Puzzle',
                repeatIcon: 'fa fa-redo',
            onSuccess: function () {
                var email = $("#useremail").val().trim();
                var password = $("#password").val().trim();
                if(email!='' && password!='') {
                    $('#loginForm').submit();
                }
            }
        });
      
        }
    }
  }
</script>
<style>
.slidercaptcha {
        margin: 0 auto;
        width: 314px;
        height: 300px;
        border-radius: 4px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.125);
        margin-top: 40px;
    }

    .slidercaptcha .card-body {
        padding: 1rem;
    }

    .slidercaptcha canvas:first-child {
        border-radius: 4px;
        border: 1px solid #e6e8eb;
    }

    .slidercaptcha.card .card-header {
        background-image: none;
        background-color: rgba(0, 0, 0, 0.03);
    }
</style>