<template>
    <v-app>
        <v-container class="py-5 account_wrapper_main">
            <h4 class="font-weight-bold mb-4 mt-10">Verification Process</h4>
            <div class="ac-verify-sec ">
                <ul class="step-anchor nav nav-tabs ">
                    <li class="nav-item" v-bind:class="{  active: isActive,done: isDone }">
                        <a>
                            <span class="steps">1</span>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                            Personal Information
                        </a>
                    </li>
                    <li class="nav-item" v-bind:class="{  active: isActive1,done: isDone1 }">
                        <a>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                            <span class="steps">2</span> Residence Address
                        </a>
                    </li>
                    <li class="nav-item" v-bind:class="{  active: isActive2,done: isDone2 }">
                        <a>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                            <span class="steps">3</span> ID Verification
                        </a>
                    </li>
                    <li class="nav-item" v-bind:class="{  active: isActive3,done: isDone3 }">
                        <a>
                            <v-icon>mdi-checkbox-marked-circle</v-icon>
                            <span class="steps">4</span> Selfie Verification
                        </a>
                    </li>
                </ul>
                <div v-if="getKycStatus == 'pending'">
                    <!-- Verified section -->
                    <div class="text-center p-5">
                        <!-- <img src="../../../assets/images/verified-finger-print.png" alt="" width="130"> -->
                        <h4 class="green_txt my-5">Verification Pending</h4>
                        <p>Your documents verification pending from admin</p>
                    </div>
                </div>
                <div v-else-if="getKycStatus == 'approve'">
                    <!-- Verified section -->
                    <div class="text-center p-5">
                        <img src="../../../assets/images/verified-finger-print.png" alt="" width="130">
                        <h4 class="green_txt my-5">Your account has been verified</h4>
                        <p>Your documents were approved by admin</p>
                    </div>
                </div>
                <div v-else>
                    <!-- Personal Information -->
                    <div v-show="persinfoDiv">
                        <h5 class="mb-3 mt-8">Personal Information</h5>
                        <v-form ref="form" v-model="valid">
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="12" xl="4" md="6">
                                        <v-text-field label="* First Name" v-model="first_name" outlined placeholder="Enter First Name" required :rules="firstnameRules" @keypress="checkSpaces(1)" @paste="copyText(1,$event)">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" xl="4" md="6">
                                        <v-text-field label="Middle Name" v-model="middle_name" outlined placeholder="Enter Middle Name" required @keypress="checkSpaces(2)" @paste="copyText(2,$event)">
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" xl="4" md="6">
                                        <v-text-field label="* Last Name" v-model="last_name" outlined placeholder="Enter Last name" required :rules="lastnameRules" @keypress="checkSpaces(3)" @paste="copyText(3,$event)">
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" xl="4" md="6">
                                        <v-menu ref="menu1" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                            <template v-slot:activator="{ on }">
                                                <v-text-field v-model="dateFormatted" persistent-hint @blur="date = parseDate(dateFormatted)" v-on="on" readonly :rules="birthdateRules" required outlined placeholder="Select Date" label="Birth Date" append-icon="event"></v-text-field>
                                            </template>
                                            <v-date-picker v-model="date" :max="new Date().toISOString().substr(0, 10)" min="1940-01-01" no-title @input="menu = false"></v-date-picker>
                                        </v-menu>
                                        <p v-show="false">{{ date }}</p>
                                    </v-col>
                                    <v-col cols="12" xl="4" md="6" class="pi_gender">
                                        <v-radio-group class="mx-auto" row v-model="gender" :rules="[v => !!v || 'Gender is required']" required>
                                            <v-radio label="Male" value="male"></v-radio>
                                            <v-radio label="Female" value="female"></v-radio>
                                        </v-radio-group>
                                    </v-col>
                                </v-row>
                                <v-col class="text-right">
                                    <v-btn large right color="success" @click="validate"> Next <v-icon>mdi-chevron-right</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-col>
                        </v-form>
                    </div>
                    <!-- Enter your residential address -->
                    <div v-show="resaddrDiv">
                        <h5 class="mb-3 mt-8">Enter your residential address</h5>
                        <v-form ref="form1" v-model="valid1">
                            <v-col cols="12">
                                <v-row>
                                    <v-col cols="12" xl="4" md="6">
                                        <v-autocomplete @change="changedValue" v-bind:items="countryList" v-model="country" item-text="text" item-value="value" label="Country" placeholder="Select Country" outlined :rules="countryRules" class="" required dense filled></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" xl="4" md="6">
                                        <v-text-field label="* City" v-model="city" outlined placeholder="Enter City" :rules="cityRules" required @keypress="checkSpaces(4)" @paste="copyText(4,$event)"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" xl="4" md="6">
                                        <v-text-field label="* Street Address" v-model="streetaddress" outlined placeholder="Street Address" :rules="addressRules" @keypress="checkSpaces(5)" @paste="copyText(5,$event)" required>
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" xl="4" md="6">
                                        <v-text-field class="inputArrows" label="* ZIP / Postal Code" outlined
                                            placeholder="Enter ZIP/Postal Code" v-model="zipcode" :rules="zipcodeRules" @keypress="isNumber($event)" @paste="copyText(6,$event)" required></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-col class="text-right">
                                    <v-btn large right color="normal" class="mr-3" @click="backto_persinfo">
                                        <v-icon>mdi-chevron-left</v-icon> Back
                                    </v-btn>
                                    <v-btn large right color="success" @click="validate1"> Next <v-icon>mdi-chevron-right</v-icon>
                                    </v-btn>
                                </v-col>
                            </v-col>
                        </v-form>
                    </div>
                    <!-- Choose type of document -->
                    <div v-show="idverifyDiv">
                        <h5 class="mb-3 mt-8">Choose type of document</h5>
                        <p>Identity Cards must have photo with both sides copied. Please provide official English
                            translation for Non-Roman Letters</p>
                        <div class="contentBG">
                            <h6 class="mb-5">Required</h6>
                            <ul class="id_verify">
                                <li>
                                    <v-icon>mdi-check</v-icon>
                                    The document must be <strong>valid:</strong> please double check expiration date
                                </li>
                                <li>
                                    <v-icon>mdi-check</v-icon>
                                    The document must be <strong>issued from a goverment</strong>
                                </li>
                                <li>
                                    <v-icon>mdi-check</v-icon>
                                    The document must show a <strong>photo of your face</strong>
                                </li>
                                <li>
                                    <v-icon>mdi-check</v-icon>
                                    The document must have a <strong>high resolution</strong>
                                </li>
                                <li>
                                    <v-icon>mdi-check</v-icon>
                                    <strong>You need to upload both sides (front and back) for ID cards</strong>
                                </li>
                                <li>
                                    <v-icon>mdi-check</v-icon>
                                    Support file upload: <strong>JPEG, JPG and PNG</strong>
                                </li>
                            </ul>
                        </div>
                        <v-col cols="12">
                            <v-row>
                                <v-col cols="12" xl="7" class="pt-0 pl-0">
                                    <div class="swich_group">
                                        <v-switch label="Passport" color="success" value="passport" hide-details v-model="check" v-on:change="check($event)"></v-switch>
                                        <v-switch label="National ID Card" color="success" value="national_id_card" hide-details v-model="check" v-on:change="check($event)"></v-switch>
                                        <v-switch label="Driving License" color="success" value="driving_license" hide-details v-model="check" v-on:change="check($event)"></v-switch>
                                    </div>
                                    <!-- File upload error message -->
                                            <v-alert
                                            close-text="Close Alert "
                                            class="file_not_sup mt-3"
                                            v-show="fileValidation">
                                            {{fileErrormessage}}                                            
                                            </v-alert>
                                    <!-- ID Card upload error message -->
                                            <v-alert
                                            close-text="Close Alert "
                                            class="file_not_sup mt-3"                                            
                                            v-show="fileVal">
                                            {{errorMessage}}
                                            </v-alert>
                                </v-col>
                                <v-col cols="12" xl="5" class="pr-0" style="display:flex">
                                    <div v-show="passport" class="ml-auto">
                                        <v-form ref="formHTML" id="formid">
                                        <!-- FIle Upload section here -->
                                        <div class="mb-5">
                                            <div class="file-upload">
                                                <div class="image-upload-wrap" id="passport_div">
                                                    <input class="file-upload-input" type='file' ref="file1" id="file_name1" name="file_name1"
                                                        v-on:change="handleFileUpload1()" accept="image/x-png,image/jpg,image/jpeg" />
                                                    <div class="drag-text">
                                                        <v-icon>mdi-cloud-upload-outline</v-icon>
                                                        <p class="text-center">Upload Files</p>
                                                        <a href="#">Select Files</a>
                                                    </div>
                                                </div>
                                                <div class="file-upload-content" id="passport_disp">
                                                    <v-icon class="file-upload-image upld_cmpl">mdi-file-upload-outline</v-icon>
                                                    <small class="cmplt-text">100%</small>
                                                    <!-- <img class="file-upload-image" src="../../../assets/images/brexily_logo.svg" alt="your image" /> -->
                                                    <div class="image-title-wrap">
                                                        <v-icon v-on:click="removeUpload(1)">mdi-window-close</v-icon>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <v-col class="text-right pr-0">
                                            <v-btn large right color="normal" class="mr-3">
                                                <v-icon>mdi-chevron-left</v-icon> Back
                                            </v-btn>
                                            <v-btn large right color="success" > Next <v-icon>mdi-chevron-right</v-icon>
                                            </v-btn>
                                        </v-col> -->
                                        </v-form>
                                    </div>
                                    <!-- ID Card Section Here -->
                                    <div v-show="idCard" class="clearfix ml-auto" >
                                        <!-- FIle Upload section here -->
                                        <div class="mb-5 clearfix">
                                            <div class="float-left mr-3">
                                                <div class="image-upload-wrap" id="idcard_div">
                                                    <input class="file-upload-input" type='file' ref="file2" id="file_name2" name="file_name2"
                                                        v-on:change="handleFileUpload2()" accept="image/*" />
                                                    <div class="drag-text">
                                                        <v-icon>mdi-cloud-upload-outline</v-icon>
                                                        <p class="text-center">Upload Files</p>
                                                        <a href="#">Select Files</a>
                                                        <p class="text-center mb-0 mt-4">Front</p>
                                                    </div>
                                                </div>
                                                <div class="file-upload-content" id="idcard_disp">
                                                    <v-icon class="file-upload-image upld_cmpl">mdi-file-upload-outline</v-icon>
                                                    <small class="cmplt-text">100%</small>
                                                    <!-- <img class="file-upload-image" src="../../../assets/images/brexily_logo.svg" alt="your image" /> -->
                                                    <div class="image-title-wrap">
                                                        <v-icon v-on:click="removeUpload(2)">mdi-window-close</v-icon>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="float-left">
                                                <div class="image-upload-wrap" id="idcard_div1">
                                                    <input class="file-upload-input" type='file' ref="file3" id="file_name3" name="file_name3"
                                                        v-on:change="handleFileUpload3()" accept="image/*" />
                                                    <div class="drag-text">
                                                        <v-icon>mdi-cloud-upload-outline</v-icon>
                                                        <p class="text-center">Upload Files</p>
                                                        <a href="#">Select Files</a>
                                                        <p class="text-center mb-0 mt-4">Back</p>
                                                    </div>
                                                </div>
                                                <div class="file-upload-content" id="idcard_disp1">
                                                    <v-icon class="file-upload-image upld_cmpl">mdi-file-upload-outline</v-icon>
                                                    <small class="cmplt-text">100%</small>
                                                    <!-- <img class="file-upload-image" src="../../../assets/images/brexily_logo.svg" alt="your image" /> -->
                                                    <div class="image-title-wrap">
                                                        <v-icon v-on:click="removeUpload(3)">mdi-window-close</v-icon>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- <v-col class="text-right pr-0">
                                            <v-btn large right color="normal" class="mr-3">
                                                <v-icon>mdi-chevron-left</v-icon> Back
                                            </v-btn>
                                            <v-btn large right color="success" > Next <v-icon>mdi-chevron-right</v-icon>
                                            </v-btn>
                                        </v-col> -->
                                    </div>
                                    <!-- Driving License section here -->
                                    <div v-show="drivingLicense" class="clearfix ml-auto">
                                                                        <!-- FIle Upload section here -->
                                        <div class="mb-5 clearfix">
                                            <div class="float-left mr-3">
                                                <div class="image-upload-wrap" id="drivinglic_div">
                                                    <input class="file-upload-input" type='file' ref="file4" id="file_name4" name="file_name4"
                                                        v-on:change="handleFileUpload4()" accept="image/*" />
                                                    <div class="drag-text">
                                                        <v-icon>mdi-cloud-upload-outline</v-icon>
                                                        <p class="text-center">Upload Files</p>
                                                        <a href="#">Select Files</a>
                                                        <p class="text-center mb-0 mt-4">Front</p>
                                                    </div>
                                                </div>
                                                <div class="file-upload-content" id="drivinglic_disp">
                                                    <v-icon class="file-upload-image upld_cmpl">mdi-file-upload-outline</v-icon>
                                                    <small class="cmplt-text">100%</small>
                                                    <!-- <img class="file-upload-image" src="../../../assets/images/brexily_logo.svg" alt="your image" /> -->
                                                    <div class="image-title-wrap">
                                                        <v-icon v-on:click="removeUpload(4)">mdi-window-close</v-icon>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="float-left">
                                                <div class="image-upload-wrap" id="drivinglic_div1">
                                                    <input class="file-upload-input" type='file' ref="file5" id="file_name5" name="file_name5"
                                                        v-on:change="handleFileUpload5()" accept="image/*" />
                                                    <div class="drag-text">
                                                        <v-icon>mdi-cloud-upload-outline</v-icon>
                                                        <p class="text-center">Upload Files</p>
                                                        <a href="#">Select Files</a>
                                                        <p class="text-center mb-0 mt-4">Back</p>
                                                    </div>
                                                </div>
                                                <div class="file-upload-content" id="drivinglic_disp1">
                                                    <v-icon class="file-upload-image upld_cmpl">mdi-file-upload-outline</v-icon>
                                                    <small class="cmplt-text">100%</small>
                                                    <!-- <img class="file-upload-image" src="../../../assets/images/brexily_logo.svg" alt="your image" /> -->
                                                    <div class="image-title-wrap">
                                                        <v-icon v-on:click="removeUpload(5)">mdi-window-close</v-icon>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                        
                                    </div>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col class="text-right pr-0">
                            <v-btn large right color="normal" class="mr-3" @click="backto_resdaddr">
                                <v-icon>mdi-chevron-left</v-icon> Back
                            </v-btn>
                            <v-btn large right color="success" @click="validate2"> Next <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-col>                        
                    </div>
                    <!-- Selfie Verification -->
                    <div v-show="selfieverifyDiv">
                        <h5 class="mb-3 mt-8">Take a photo with ID</h5>
                        <p class="mb-5">Please provide a photo of you holding your documents. In the same picture have a
                            reference to BREXILY and today’s date displayed a note with the word <strong>‘BREXILY’</strong>,
                            today’s date, and your signature will do.
                        </p>
                        <v-col>
                            <v-row>
                                <v-col cols="12" xl="6">
                                    <div class="contentBG">
                                        <h6 class="mb-5">Required</h6>
                                        <ul class="id_verify">
                                            <li>
                                                <v-icon>mdi-check</v-icon>
                                                Face clearly visible
                                            </li>
                                            <li>
                                                <v-icon>mdi-check</v-icon>
                                                Photo ID Clearly visible
                                            </li>
                                            <li>
                                                <v-icon>mdi-check</v-icon>
                                                Note with word <strong>'BREXILY'</strong>
                                            </li>
                                            <li>
                                                <v-icon>mdi-check</v-icon>
                                                Note with today's date
                                            </li>
                                            <li>
                                                <v-icon>mdi-check</v-icon>
                                                Note with signature
                                            </li>
                                        </ul>
                                    </div>
                                </v-col>
                                <v-col cols="12" xl="6" class="text-right">
                                    <div class="file-upload" style="display:block">
                                        <div class="image-upload-wrap lastTab" id="selfverify_div">
                                            
                                            <div class="drag-text drag-text2 ">
                                                <img src="../../../assets/images/id-proof.png" alt=""
                                                    class="float-left id-proof-img">
                                                <div class="upload-sec">
                                                    <input class="file-upload-input" type='file' ref="file6" id="file_name6"
                                                v-on:change="handleFileUpload6()" accept="image/*" />
                                                    <v-icon>mdi-camera-enhance-outline</v-icon>
                                                    <p class="text-center">Upload Photo</p>
                                                    <a href="#">Select Files</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="file-upload-content" id="selfverify_disp">
                                            <img class="img-fluid" id="selfy_disp_img" src="#" alt="your image" />
                                            <div class="image-title-wrap">
                                                <v-icon v-on:click="removeUpload(6)">mdi-window-close</v-icon>
                                            </div>
                                        </div>                                        
                                    </div>                                    
                                </v-col>
                                <v-alert
                                            close-text="Close Alert "
                                            class="file_not_sup mt-3"
                                            v-show="fileValidation6">
                                            {{selfieErrMsg}}                                            
                                            </v-alert>
                                <v-alert close-text="Close Alert " class="file_not_sup mt-3" v-show="selfyVal">{{selfieerrorMessage}}</v-alert>
                            </v-row>
                            <v-col class="text-right pr-0">
                                <v-btn large right color="normal" class="mr-3" @click="backto_idproof">
                                    <v-icon>mdi-chevron-left</v-icon> Back
                                </v-btn>
                                <v-btn large right color="success" v-on:click="validate3" :loading="loading" :disabled="loading"> Next <v-icon>mdi-chevron-right</v-icon>
                                </v-btn>
                            </v-col>
                        </v-col>
                    </div>
                    <!-- Success section -->
                    <div class="text-center p-5" v-show="successDiv">
                        <img src="../../../assets/images/success-img.png" alt="" width="150">
                        <h4 class="green_txt my-5">Success</h4>
                        <p>Thank You. Your verification information has been submitted.<br/>You will receive an email confirming your successful application for KYC verification.</p>
                    </div>
                </div>                              
            </div>
        </v-container>
        <v-snackbar v-model="snackbar" color="yellow" :bottom="y === 'bottom'" :left="x === 'left'" :multi-line="mode === 'multi-line'" :right="x === 'right'" :timeout="timeout" :top="y === 'top'" :vertical="mode === 'vertical'" style="color: #000;">
            {{ snackbar_text }}

            <v-icon @click="snackbar = false" class="close_snak">mdi-close</v-icon>
            <!-- <v-btn dark text @click="snackbar = false" style="color: #000;">
                Close
            </v-btn> -->
        </v-snackbar>
    </v-app>
</template>
<script class="jsbin" src="https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js">
</script>
<script>
    import axios from 'axios'
    import qs from 'qs'
    import $ from 'jquery'
    export default {
        name: 'Verification',
        singleExpand: false,
        components: {},
        props: {
            getKycStatus: '',
        },
        data: vm => ({
            loading: false,
            check: null,
            idproof_type: '',
            isActive: true,
            isDone: false,
            isActive1: false,
            isDone1: false,
            isActive2: false,
            isDone2: false,
            isActive3: false,
            isDone3: false,
            persinfoDiv: true,
            resaddrDiv: false,
            idverifyDiv: false,
            selfieverifyDiv: false,
            successDiv: false,
            fileValidation: false,
            fileErrormessage: '',
            fileValidation6: false,
            selfieErrMsg: '',
            fileVal: false,
            errorMessage: '',
            selfyVal: false,
            selfieerrorMessage: '',
            passport: false,
            idCard: false,
            drivingLicense: false,
            valid: true,
            //date: new Date().toISOString().substr(0, 10),
            date: '',
            dateFormatted: '',
            //dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
            first_name: '',
            firstnameRules: [
                v => !!v || 'First Name is required',
                v => (v && v.length >= 3) || 'First Name must have 3+ characters',
                v => (v && v.length <= 30) || 'Name must be less than 30 characters',
                v => /^[a-zA-Z0-9\s]+$/.test(v) || 'First Name should be Alpha-Numeric only.'
            ],
            middle_name: '',
            middlenameRules: [
                v => !!v || 'Middle Name is required',
                v => (v && v.length >= 3) || 'Middle Name must have 3+ characters',
                v => (v && v.length <= 30) || 'Name must be less than 30 characters',
                v => /^[a-zA-Z0-9\s]+$/.test(v) || 'Middle Name should be Alpha-Numeric only.'
            ],
            last_name: '',
            lastnameRules: [
                v => !!v || 'Last Name is required',
                v => (v && v.length >= 3) || 'Last Name must have 3+ characters',
                v => (v && v.length <= 30) || 'Name must be less than 30 characters',
                v => /^[a-zA-Z0-9\s]+$/.test(v) || 'Last Name should be Alpha-Numeric only.'
            ],
            birthdateRules: [
                v => !!v || 'Birth Date is required',
            ],
            countryList: [],
            country: '',
            countryRules: [
                v => !!v || 'Country is required',
            ],
            city: '',
            cityRules: [
                v => !!v || 'City is required',
                v => (v && v.length >= 2) || 'Provide valid City',  
            ],
            streetaddress: '',
            addressRules: [
                v => !!v || 'Street address is required',
                v => (v && v.length >= 2) || 'Provide valid Street address',                
            ],
            zipcode: '',
            zipcodeRules: [
                v => !!v || 'ZIP/Postal code is required',
                v => /^[0-9]*$/.test(v) || 'ZIP/Postal code should be Numeric only.'
            ],
            proof_path: [],
            id_proof_one: '',
            id_proof_two: '',
            selfie_path: '',
            snackbar: false,
            snackbar_text: "",
            vertical: true,
            timeout: 6000,
            color: "yellow",
            x: 'right',
            y: 'top',
        }),
        watch: {
            date() {
                this.dateFormatted = this.formatDate(this.date)
            },
            check: function(e) {
                this.fileVal = false
                this.errorMessage = ''
                this.fileErrormessage=""
                this.fileValidation=false
                this.id_proof_one = ''
                this.id_proof_two = ''
                this.idproof_type = e
                if (e == 'passport') {
                    this.idCard = false
                    this.drivingLicense = false
                    this.passport = true
                    this.removeUpload(2)
                    this.removeUpload(3)
                    this.removeUpload(4)
                    this.removeUpload(5)
                } else if (e == 'national_id_card') {
                    this.passport = false
                    this.drivingLicense = false
                    this.idCard = true
                    this.removeUpload(1)
                    this.removeUpload(4)
                    this.removeUpload(5)
                } else if (e == 'driving_license') {
                    this.passport = false
                    this.idCard = false
                    this.drivingLicense = true
                    this.removeUpload(1)
                    this.removeUpload(2)
                    this.removeUpload(3)
                }else{
                    this.passport = false
                    this.idCard = false
                    this.drivingLicense = false
                     this.removeUpload(1)
                    this.removeUpload(2)
                    this.removeUpload(3)
                    this.removeUpload(4)
                    this.removeUpload(5)
                }
            },
        },
        methods: {
            isNumber: function(evt) {
               
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            },
            copyText: function(type, event) {
                event.preventDefault();
                let data = event.clipboardData.getData('text')
                let txt = data.replace(/\s/g,"")
                if(type == 1){
                    this.first_name = txt
                }else if(type == 2){
                    this.middle_name = txt
                }
                else if(type == 3){
                    this.last_name = txt
                }
                else if(type == 4){
                    this.city = txt
                }
                else if(type == 5){
                    this.streetaddress = txt
                }
                else if(type == 6){
                    this.zipcode = txt
                }
            },
            checkSpaces: function(type){
                let wsRegex = /^\s*\s*$/;
                if(type == 1){
                    this.first_name = this.first_name.replace(wsRegex, '');
                }else if(type == 2){
                    this.middle_name = this.middle_name.replace(wsRegex, '');
                }
                else if(type == 3){
                    this.last_name = this.last_name.replace(wsRegex, '');
                }
                else if(type == 4){
                    this.city = this.city.replace(wsRegex, '');
                }
                else if(type == 5){
                    this.streetaddress = this.streetaddress.replace(wsRegex, '');
                }
                
            },
            removeUpload: function(e) {
                if(e == 1){       
                    let formData = new FormData();
                    formData.delete("file_name1")                             
                    $('#file_name1').val('');
                    $('#passport_div').show();
                    $('#passport_disp').hide();
                    this.id_proof_one = ''
                }else if(e == 2){
                    let formData = new FormData();
                    formData.delete("file_name2")   
                    $('#file_name2').val('');
                    $('#idcard_div').show();
                    $('#idcard_disp').hide();
                    this.id_proof_one = ''
                }else if(e == 3){
                    let formData = new FormData();
                    formData.delete("file_name3")   
                    $('#file_name3').val('');
                    $('#idcard_div1').show();
                    $('#idcard_disp1').hide();
                    this.id_proof_two = ''
                }else if(e == 4){
                    let formData = new FormData();
                    formData.delete("file_name4")  
                    $('#file_name4').val('');
                    $('#drivinglic_div').show();
                    $('#drivinglic_disp').hide();
                    this.id_proof_one = ''
                }else if(e == 5){
                    let formData = new FormData();
                    formData.delete("file_name5")  
                    $('#file_name5').val('');
                    $('#drivinglic_div1').show();
                    $('#drivinglic_disp1').hide();
                    this.id_proof_two = ''
                }else if(e == 6){
                    let formData = new FormData();
                    formData.delete("file_name6")
                    $('#file_name6').val('');
                    $('#selfverify_div').show();
                    $('#selfverify_disp').hide();
                    this.selfie_path = ''
                }
                
            },
            validate() {
                if (this.$refs.form.validate()) {
                    this.persinfoDiv = false
                    this.resaddrDiv = true
                    this.isActive = false
                    this.isDone = true
                    this.isActive1 = true
                }
            },
            validate1() {
                if (this.$refs.form1.validate()) {
                    this.resaddrDiv = false
                    this.idverifyDiv = true
                    this.isActive1 = false
                    this.isDone1 = true
                    this.isActive2 = true
                }
            },
            subValdate2() {
                this.fileVal = false
                this.errorMessage = ''
                this.idverifyDiv = false
                this.selfieverifyDiv = true
                this.isActive2 = false
                this.isDone2 = true
                this.isActive3 = true
            },
            validate2() {
                if (this.idproof_type == 'passport') {
                    if (this.id_proof_one) {
                        this.fileVal=false
                        this.subValdate2()
                    } else {
                        this.fileErrormessage=""
                        this.fileValidation=false
                        this.fileVal = true
                        this.errorMessage = 'You need to upload file for Passport'
                    }
                } else if (this.idproof_type == 'national_id_card') {
                    if (this.id_proof_one && this.id_proof_two) {
                         this.fileVal=false
                        this.subValdate2()
                    } else {
                        this.fileErrormessage=""
                        this.fileValidation=false
                        this.fileVal = true
                        this.errorMessage = 'You need to upload both sides (front and back ) for ID card'
                    }
                } else if (this.idproof_type == 'driving_license') {
                    if (this.id_proof_one && this.id_proof_two) {
                         this.fileVal=false
                        this.subValdate2()
                    } else {
                        this.fileErrormessage=""
                        this.fileValidation=false
                        this.fileVal = true
                        this.errorMessage = 'You need to upload both sides (front and back ) for Driving License'
                    }
                } else {
                    this.fileErrormessage=""
                    this.fileValidation=false
                    this.fileVal = true
                    this.errorMessage = 'You need to choose any one Id proof'
                }
            },
            validate3() {
                
                if (this.selfie_path) {   
                    this.loading = true;    
                    this.selfyVal = false             
                    this.saveKycData();
                } else {
                    this.fileValidation6=false
                    this.selfyVal = true
                    this.selfieerrorMessage = 'You need to upload document'
                }
            },
            backto_persinfo() {
                this.persinfoDiv = true
                this.resaddrDiv = false
                this.isActive = true
                this.isDone = false
                this.isActive1 = false
            },
            backto_resdaddr() {
                this.idverifyDiv = false
                this.resaddrDiv = true
                this.isActive1 = true
                this.isDone1 = false
                this.isActive2 = false
            },
            backto_idproof() {
                this.selfieverifyDiv = false
                this.idverifyDiv = true
                this.isActive2 = true
                this.isDone2 = false
                this.isActive3 = false
            },
            formatDate(date) {
                if (!date) return null
                const [year, month, day] = date.split('-')
                return `${day}/${month}/${year}`
            },
            parseDate(date) {
                if (!date) return null
                const [month, day, year] = date.split('/')
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
            },
            save(date) {
                this.$refs.menu.save(date)
            },
            countriesList: function() {
                var self = this;
                let auth_token = this.$store.getters.authToken;
                if (auth_token) {
                    const URL = process.env.VUE_APP_API_URL + "getCounties";
                    axios({
                            method: 'get',
                            url: URL,
                            headers: {
                                "accept": "application/json",
                                "Authorization": "Bearer " + auth_token
                            }
                        })
                        .then(function(response) {
                            //handle success 
                            let cList = response.data.Result;
                            self.countryList = self.countryList.concat({
                                text: 'Select Country',
                                value: 0
                            });
                            Object.keys(cList).forEach(value => {
                                self.countryList = self.countryList.concat({
                                    text: cList[value].country_name,
                                    value: cList[value].country_id
                                });
                            });
                        })
                        .catch(function(err) {
                            if(err.response.data.Result == 'User is blocked'){
                                self.snackbar_text = "Your account has been deactivated."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/";
                                },2000)
                            }
                            else if(err.response.data.Result == 'Twofa Status Inactive'){
                                self.snackbar_text = "Please Activate Two-Factor Authentication."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/Security";
                                },2000)
                            }
                            else{
                                self.snackbar_text = "Server busy, please try after sometime."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/";
                                },2000)
                            }
                        });
                } else {
                    window.location.href = "/";
                }
            },
            changedValue: function(e) {
                if (e) {
                    this.country_code = "+" + e[0]
                } else {
                    this.country_code = "0"
                }
            },
            saveKycData: function() {
                var self = this;
                let auth_token = this.$store.getters.authToken;
                let first_name = this.first_name
                let middle_name = this.middle_name
                let last_name = this.last_name
                let gender = this.gender
                let date = this.date
                let country = this.country
                let city = this.city
                let streetaddress = this.streetaddress
                let zipcode = this.zipcode
                let idproof_type = this.idproof_type
                if (auth_token) {
                    const apiUrl = process.env.VUE_APP_API_URL + 'save_kyc';
                    let formData = new FormData();
                    formData.append('proof_path_1', this.id_proof_one);
                    formData.append('proof_path_2', this.id_proof_two);
                    formData.append('selfie_path', this.selfie_path);
                    formData.append("first_name", first_name);
                    formData.append("middle_name", middle_name);
                    formData.append("last_name", last_name);
                    formData.append("birth_date", date);
                    formData.append("gender", gender);
                    formData.append("country", country);
                    formData.append("city", city);
                    formData.append("street_address", streetaddress);
                    formData.append("pin_code", zipcode);
                    formData.append("proof", idproof_type);
                    axios.post(process.env.VUE_APP_API_URL + 'save_kyc',
                            formData, {
                                headers: {
                                    'Content-Type': 'multipart/form-data',
                                    "Authorization": "Bearer " + auth_token
                                }
                            }
                        ).then(function(response) {
                            if(response.data.status == 'Success'){
                                self.loading = false;
                                self.selfyVal = false
                                self.selfieverifyDiv = false
                                self.isActive3 = false
                                self.isDone3 = true
                                self.successDiv = true
                                self.snackbar_text = "KYC information updated successfully."
                                self.snackbar = true
                                setTimeout(function(){
                                    self.$emit('vchildToParent', "Success")
                                },1000);            
                            }else{
                                self.loading = false;
                                self.snackbar_text = "Something went wrong please try after some time."
                                self.snackbar = true
                                // setTimeout(function(){
                                //     self.$emit('vchildToParent', "Success")
                                // },2000);                                
                            }                            
                        })
                        .catch(function(err) {
                            if(err.response.data.Result == 'User is blocked'){
                                self.snackbar_text = "Your account has been deactivated."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/";
                                },2000)
                            }
                            else if(err.response.data.Result == 'Twofa Status Inactive'){
                                self.snackbar_text = "Please Activate Two-Factor Authentication."
                                self.snackbar = true
                                setTimeout(() => {
                                window.location.href = "/Security";
                                },2000)
                            }
                            else{
                                self.loading = false;
                                self.snackbar_text = "Something went wrong please try after some time."
                                self.snackbar = true
                                self.$emit('vchildToParent', "Success") 
                            }
                            
                        });
                } else {
                    window.location.href = "/";
                }
            },
            handleFileUpload1() {
                this.fileVal = false
                const file1 = this.$refs.file1.files[0];
                //const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                const allowedTypes = ["jpeg", "jpg", "png"];
                if(file1.name.split(".").length > 2){
                    this.removeUpload(1);
                    this.id_proof_one="",
                    this.fileErrormessage="Multi extenstion file not allowed and file name should not contain dots(.)"
                    this.fileValidation = true
                }
                else if (file1.size > 1024 * 1024) {
                    //File too big (> 1MB)
                    this.removeUpload(1);
                    this.id_proof_one = "";
                    this.fileErrormessage = "File size should be less than 1MB.";
                    this.fileValidation = true
                } else if (!allowedTypes.includes(file1.name.split(".")[1])) {
                    //Incorrect File Type
                    this.removeUpload(1);
                    this.id_proof_one = "";
                    this.fileErrormessage="The Specified file could not be uploaded. The image is invalid or not supported.Allowed type JPEG, JPG and PNG only"
                    this.fileValidation = true
                } else {
                    this.fileErrormessage = "";
                    this.fileValidation = false
                    this.id_proof_one = file1;
                    $('#passport_div').hide();
                    $('#passport_disp').show();            
                }
            },
            handleFileUpload2() {
                this.fileVal = false
                const file2 = this.$refs.file2.files[0];
                //const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                const allowedTypes = ["jpeg", "jpg", "png"];
                 if(file2.name.split(".").length > 2){
                     this.removeUpload(2);
                    this.id_proof_one="",
                    this.fileErrormessage="Multi extenstion file not allowed and file name should not contain dots(.)"
                    this.fileValidation = true
                }
                else if (file2.size > 1024 * 1024) {
                    //File too big (> 1MB)
                    this.removeUpload(2);
                    this.id_proof_one = "";
                    this.fileErrormessage = "File size should be less than 1MB.";
                    this.fileValidation = true
                } else if (!allowedTypes.includes(file2.name.split(".")[1])) {
                    //Incorrect File Type
                    this.removeUpload(2);
                    this.id_proof_one = "";
                    this.fileErrormessage="The Specified file could not be uploaded. The image is invalid or not supported.Allowed type JPEG, JPG and PNG only"
                    this.fileValidation = true
                } else {
                    this.fileErrormessage = "";
                    this.fileValidation = false
                    this.id_proof_one = file2;
                    $('#idcard_div').hide();
                    $('#idcard_disp').show();
                }
            },
            handleFileUpload3() {
                this.fileVal = false
                const file3 = this.$refs.file3.files[0];
                //const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                const allowedTypes = ["jpeg", "jpg", "png"];
                if(file3.name.split(".").length > 2){
                    this.removeUpload(3);
                    this.id_proof_two="",
                    this.fileErrormessage="Multi extenstion file not allowed and file name should not contain dots(.)"
                    this.fileValidation = true
                }
                else if (file3.size > 1024 * 1024) {
                    //File too big (> 1MB)
                    this.removeUpload(3);
                    this.id_proof_two = "";
                    this.fileErrormessage = "File size should be less than 1MB.";
                    this.fileValidation = true
                } else if (!allowedTypes.includes(file3.name.split(".")[1])) {
                    //Incorrect File Type
                    this.removeUpload(3);
                    this.id_proof_two = "";
                    this.fileErrormessage="The Specified file could not be uploaded. The image is invalid or not supported.Allowed type JPEG, JPG and PNG only"
                    this.fileValidation = true
                } else {
                     this.fileErrormessage = "";
                    this.fileValidation = false
                    this.id_proof_two = file3;
                     $('#idcard_div1').hide();
                    $('#idcard_disp1').show();
                }
            },
            handleFileUpload4() {
                this.fileVal = false
                const file4 = this.$refs.file4.files[0];
                //const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                const allowedTypes = ["jpeg", "jpg", "png"];
                if(file4.name.split(".").length > 2){
                    this.removeUpload(4);
                    this.id_proof_one="",
                    this.fileErrormessage="Multi extenstion file not allowed and file name should not contain dots(.)"
                    this.fileValidation = true
                }
                else if (file4.size > 1024 * 1024) {
                    //File too big (> 1MB)
                    this.removeUpload(4);
                    this.id_proof_one = "";
                    this.fileErrormessage = "File size should be less than 1MB.";
                    this.fileValidation = true
                } else if (!allowedTypes.includes(file4.name.split(".")[1])) {
                    //Incorrect File Type
                    this.removeUpload(4);
                    this.id_proof_one = "";
                    this.fileErrormessage="The Specified file could not be uploaded. The image is invalid or not supported.Allowed type JPEG, JPG and PNG only"
                    this.fileValidation = true
                } else {
                    this.fileErrormessage = "";
                    this.fileValidation = false
                    this.id_proof_one = file4;
                    $('#drivinglic_div').hide();
                    $('#drivinglic_disp').show();
                }
            },
            handleFileUpload5() {
                this.fileVal = false
                const file5 = this.$refs.file5.files[0];
                //const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                const allowedTypes = ["jpeg", "jpg", "png"];
                if(file5.name.split(".").length > 2){
                    this.removeUpload(5);
                    this.id_proof_two="",
                    this.fileErrormessage="Multi extenstion file not allowed and file name should not contain dots(.)"
                    this.fileValidation = true
                }
                else if (file5.size > 1024 * 1024) {
                    //File too big (> 1MB)
                    this.removeUpload(5);
                    this.id_proof_two = "";
                    this.fileErrormessage = "File size should be less than 1MB.";
                    this.fileValidation = true
                } else if (!allowedTypes.includes(file5.name.split(".")[1])) {
                    //Incorrect File Type
                    this.removeUpload(5);
                    this.id_proof_two = "";
                    this.fileErrormessage="The Specified file could not be uploaded. The image is invalid or not supported.Allowed type JPEG, JPG and PNG only"
                    this.fileValidation = true
                } else {
                    this.fileErrormessage = "";
                    this.fileValidation = false
                    this.id_proof_two = file5;
                    $('#drivinglic_div1').hide();
                    $('#drivinglic_disp1').show();
                }
            },
            handleFileUpload6() {
                this.selfyVal = false
                const file6 = this.$refs.file6.files[0];
                //const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                const allowedTypes = ["jpeg", "jpg", "png"];
                if(file6.name.split(".").length > 2){
                    this.removeUpload(6);
                    this.selfie_path="",
                    this.selfieErrMsg="Multi extenstion file not allowed and file name should not contain dots(.)"
                    this.fileValidation6 = true
                }
                else if (file6.size > 1024 * 1024) {
                    //File too big (> 1MB)
                    this.removeUpload(6);
                    this.selfie_path = "";
                    this.selfieErrMsg = "File size should be less than 1MB.";
                    this.fileValidation6 = true
                } else if (!allowedTypes.includes(file6.name.split(".")[1])) {
                    //Incorrect File Type
                    this.removeUpload(6);
                    this.selfie_path = "";
                    this.selfieErrMsg="The Specified file could not be uploaded. The image is invalid or not supported. Allowed type JPEG, JPG and PNG only";
                    this.fileValidation6 = true
                } else {
                    this.selfieErrMsg="";
                    this.fileValidation6 = false
                    this.selfie_path = file6;
                    var reader = new FileReader();
                    reader.addEventListener("load", function() {                        
                        $('#selfverify_div').attr("style", "display: none !important");
                        $('#selfy_disp_img').attr('src', reader.result);
                        $('#selfverify_disp').show();
                    }.bind(this), false);
                    reader.readAsDataURL(this.selfie_path);
                }
            },
        },
        created() {
            this.countriesList()
        },
        mounted: function() {
            $('.image-upload-wrap').bind('dragover', function() {
                $('.image-upload-wrap').addClass('image-dropping');
            });
            $('.image-upload-wrap').bind('dragleave', function() {
                $('.image-upload-wrap').removeClass('image-dropping');
            });

            if(this.getKycStatus == "pending" || this.getKycStatus == "approve"){
                this.isActive = false
                this.isDone = true
                this.isActive1 = false
                this.isDone1 = true
                this.isActive2 = false
                this.isDone2 = true
                this.isActive3 = false
                this.isDone3 = true
            }
        }
    };
</script>
