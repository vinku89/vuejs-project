<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
      </label>
      <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            file: ''
        }
    },
    methods: {
      /*
        Submits the file to the server
      */
      submitFile(){
        /*
                Initialize the form data
            */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.append('proof_path_1', this.file);
    console.log(formData);
    let auth_token = this.$store.getters.authToken;
        /*
          Make the request to the POST /single-file URL
        */
            axios.post( process.env.VUE_APP_API_URL +'save_kyc',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": "Bearer " + auth_token
                }
              }
            ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },

      /*
        Handles a change on the file upload
      */
      handleFileUpload(){
        this.file = this.$refs.file.files[0];
        console.log(this.file);
      }
    }
}
</script>