<template>
<div class="content">
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">TypeAhead component for vue 2</p><a class="card-header-icon"><span class="icon"><i class="fa fa-angle-down"></i></span></a>
    </header>
    <div class="card-content">
      <div class="content">
        <ul> 
          <li>component uses model for 2 way data bindings</li>
          <li>use arrows to select value and enter to confirm</li>
          <li>use mouse click to select value</li>
          <li>use arrows (&uparrow;&downarrow;) to open list if hidden</li>
          <li>use enter while typing to select proposition</li>
        </ul>
        <div class="field">
          <label class="label">Type programing language</label>
          <input-ahead v-model="value" placeholder="Type programing language" :suggestions="suggestions"></input-ahead>
        </div>
        <p>
           current value:
           <a>{{ value }}</a>
        </p>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import Vue from 'vue';
Vue.component('input-ahead', {
  name: 'input-ahead',
	template: `
		<div class="control">
			<input 
				class="input" 
				type="text" 
				:value="fullInput"
				:placeholder="placeholder"
				@keydown.enter="enter"
        @keydown.down.prevent="down"
        @keydown.up.prevent="up"
        @input="change"
				@focus="down"
				ref="inp"
			>
			<div class="menu">
				<ul v-if="openSuggestion" class="menu-list">
					<li v-for="(m, $index) in matches">
						<a @click="select($index)" :class="{'is-active': $index==current}">{{ m }}</a>
					</li>
				</ul>
			</div>
		</div>
	`,
	props: ['value', 'placeholder', 'suggestions'],
	data() {
		return {
			userInput: '',
			fullInput: '',
			open: false,
			current: 0
		}
	},
	computed: {
		matches() {
			const escaped = this.escapeRegExp(this.userInput)
			const patt = new RegExp(`^(${escaped})`, 'i')
			return this.suggestions.filter((str) => {
				return str.match(patt) !== null
			})
		},
		openSuggestion() {
			return this.open &&
				this.matches.length != 0 &&
				this.userInput !== this.fullInput
		},
	},
	methods: {
		up() {
			this.current--
			if(this.current < 0) {
				this.current = 0
			}
			if(!this.open) this.current=0
			this.start()
		},
		down() {
			this.current++
			if(this.current >= this.matches.length) {
				this.current = this.matches.length - 1
			}
			if(!this.open) this.current=0
			this.start()
		},
		stop() {
			this.open = false
		},
		start() {
			this.open = true
			this.setFullInput()
		},
		select(index) {
			this.current = index
			this.start()
			this.enter()
		},
		enter() {
			this.$emit('input', this.fullInput)
		},
		change(event) {
			const n = event.target.value
			const b = this.userInput.length < n.length
						
			this.userInput = event.target.value
			
			if(b) {
				this.current = 0
				this.start()
			} else {
				this.stop()
				this.fullInput = this.userInput
			}
		},
		setFullInput() {	
			if(this.open === false) {
				return
			}
			
			var match = this.matches[this.current] || this.userInput
			this.fullInput = match
			
			setTimeout(() => {
				this.$refs.inp.setSelectionRange(
					this.userInput.length, this.fullInput.length
				)
			}, 0)
		},
		escapeRegExp(str) {
			return str;
		}
	},
	watch: {
		value: function(n) {
			this.userInput = n
			this.fullInput = n
			this.setFullInput()
			this.stop()
		}
	},
	mounted() {
		this.userInput = this.value
		this.fullInput = this.value
		this.setFullInput()
		this.stop()
	}
})


export default {
  name: 'testwallet',
  data() {
		return {
			value: 'default',
			suggestions: ["A Sharp (.NET)","A Sharp (Axiom)","A-0 System","A+ (programming language)","A++","ABAP","ABC (programming language)","ABC ALGOL","ABSET","ABSYS","ACC (programming language)","Accent (programming language)","Distributed Application Specification Language","LGP-30","Action! (programming language)","ActionScript","Ada (programming language)","Adenine (programming language)","Agda (theorem prover)","Agilent VEE","Agora (programming language)","AIMMS","Alef (programming language)","Algebraic Logic Functional programming language","ALGOL 58","ALGOL 60","ALGOL 68","ALGOL W","Alice (programming language)","Alma-0","AmbientTalk","Amiga E","AMOS (programming language)","AMPL","Salesforce.com","APL (programming language)","App Inventor for Android (programming language)","AppleScript","APT (programming language)","Arc (programming language)","ARexx","Argus (programming language)","AspectJ","Assembly language","ATS (programming language)","Ateji PX","AutoHotkey","Autocoder","AutoIt","AutoLISP","Averest","AWK","Axum (programming language)","Active Server Pages","B (programming language)","Babbage (programming language)","Bash (Unix shell)","BASIC","Bc (programming language)","BCPL","BeanShell","Batch file","Bertrand (programming language)","BETA (programming language)","Bistro (programming language)","BitC","BLISS (programming language)","Blockly","BlooP and FlooP","Boo (programming language)","Boomerang (programming language)","Bourne shell","Bash (Unix shell)","Korn shell","Qualcomm Brew","Business Process Execution Language","Business Basic","C (programming language)","C--","C++","C Sharp (programming language)","C/AL","Caché ObjectScript","C Shell","Caml","Cayenne (programming language)","CDuce","Cecil (programming language)","Cesil","Céu (programming language)","Ceylon (programming language)","CFEngine","ColdFusion Markup Language","Cg (programming language)","Ch (computer programming)","Chapel (programming language)","Charity (programming language)","Charm (language)","CHILL","CHIP-8","Chomski","ChucK","CICS","Cilk","Citrine (programming language)","AS/400 Control Language","Claire (programming language)","Clarion (programming language)","Clean (programming language)","Clipper (programming language)","CLIPS (programming language)","CLIST","Clojure","CLU (programming language)","CMS-2 (programming language)","COBOL","CobolScript","Cobra (programming language)","CODE (programming language)","CoffeeScript","ColdFusion","COMAL","Combined Programming Language","COMIT","Common Intermediate Language","Common Lisp","COMPASS","Component Pascal","Constraint Handling Rules","COMTRAN","Converge (programming language)","Cool (programming language)","Coq","Coral 66","Corn (emulator)","CorVision","COWSEL","CPL (programming language)","Cryptol","Crystal (programming language)","C shell","Csound","Communicating sequential processes","CUDA","Curl (programming language)","Curry (programming language)","Cybil (programming language)","Cyclone (programming language)","Cython","D (programming language)","Datapoint's Advanced Systems Language","Distributed Application Specification Language","Dart (programming language)","DataFlex","Datalog","DATATRIEVE","DBase","Dc (computer program)","DIGITAL Command Language","Deesel","Delphi (programming language)","Dink Smallwood","DIBOL","Sepandar Kamvar","Draco (programming language)","DRAKON","Dylan (programming language)","DYNAMO (programming language)","E (programming language)","EarSketch","Ease (programming language)","PL/I","Easy Programming Language","Easytrieve","ECMAScript","Edinburgh IMP","EGL (programming language)","Eiffel (programming language)","ELAN (programming language)","Elixir (programming language)","Elm (programming language)","Emacs Lisp","Emerald (programming language)","Epigram (programming language)","Easy Programming Language","Erlang (programming language)","Es (Unix shell)","Escher (programming language)","Executive Systems Problem Oriented Language","Esterel","Etoys (programming language)","Euclid (programming language)","Euler (programming language)","Euphoria (programming language)","EusLisp Robot Programming Language","CMS EXEC","EXEC 2","Executable UML","F (programming language)","F Sharp (programming language)","F* (programming language)","Factor (programming language)","Falcon (programming language)","Fantom (programming language)","FAUST (programming language)","FFP (programming language)","Fjölnir (programming language)","FL (programming language)","Flavors (programming language)","Flex (language)","BlooP and FlooP","FLOW-MATIC","FOCAL (programming language)","FOCUS","FOIL (programming language)","FORMAC (programming language)","Formula language","Forth (programming language)","Fortran","Fortress (programming language)","FoxBase","FoxPro","FP (programming language)","Franz Lisp","Frege (programming language)","F-Script (programming language)","G (programming language)","GameMaker: Studio","GameMonkey Script","General Algebraic Modeling System","GAP computer algebra system","G-code","Godot (game engine)","Genie (programming language)","Geometric Description Language","Generic Java","GEORGE (programming language)","GLSL","GNU E","Golden master","Go (programming language)","Go! (programming language)","Game Oriented Assembly Lisp","Gödel (programming language)","Golo (programming language)","MAD (programming language)","Google Apps Script","Gosu (programming language)","IBM 1620","GPSS","Computer Sciences Corporation","GRASS (programming language)","Groovy (programming language)","Hack (programming language)","HAGGIS","HAL/S","Halide (programming language)","Hamilton C shell","Harbour (software)","Hope (programming language)","Hugo (programming language)","Hume (language)","HyperTalk","IBM Basic assembly language","IBM HAScript","IBM Informix-4GL","IBM RPG","ICI (programming language)","Icon (programming language)","Id (programming language)","IDL (programming language)","Idris (programming language)","IMP (programming language)","Inform","Interlisp","Io (programming language)","Ioke (programming language)","Information Processing Language","IPTSCRAE","ISLISP","ISPF","ISWIM","J (programming language)","J Sharp","Visual J++","JADE (programming language)","JAL (compiler)","Janus (concurrent constraint programming language)","Janus (time-reversible computing programming language)","JASS","Java (programming language)","JavaScript","Job Control Language","JEAN","Join Java","JOSS","Joule (programming language)","JOVIAL","Joy (programming language)","JScript","JScript .NET","JavaFX Script","Julia (programming language)","Jython","K (programming language)","Kaleidoscope (programming language)","Karel (programming language)","Karel++","IntelliCorp (Software)","LIS (programming language)","Language for Instruction Set Architecture","Lisaac","Lisp (programming language)","Lite-C","Lithe (programming language)","Little b (programming language)","Logo (programming language)","Logtalk","LotusScript","LPC (programming language)","LSE (programming language)","Linden Scripting Language","LiveCode","LiveScript","Lua (programming language)","Lucid (programming language)","Lustre (programming language)","LYaPAS","Lynx (programming language)","M2001","M4 (computer language)","M Sharp (programming language)","Machine code","MAD (programming language)","MAD (programming language)","Magik (programming language)","Magma computer algebra system","Make (software)","Maude system","Maple (software)","MAPPER","MARK IV (software)","Mary (programming language)","Microsoft Macro Assembler","MATH-MATIC","Mathematica","MATLAB","Maxima (software)","Macsyma","Max (software)","Autodesk 3ds Max","Maya Embedded Language","MDL (programming language)","Mercury (programming language)","Mesa (programming language)","Metafont","Microassembler","MicroScript (programming language)","MuPAD","Mystic BBS","Netwide Assembler","Napier88","Neko (programming language)","Nemerle","NesC","NESL","Net.Data","NetLogo","NetRexx","NewLISP","NEWP","Newspeak (programming language)","NewtonScript","NGL (programming language)","Nial","Nice (programming language)","Nickle (programming language)","Nickle (programming language)","Nim (programming language)","NORD Programming Language","Not eXactly C","Not Quite C","Nullsoft Scriptable Install System","Nu (programming language)","NWScript","NXT-G","O:XML","Oak (programming language)","Oberon (programming language)","OBJ2","Object Lisp","ObjectLOGO","Object REXX","Object Pascal","Objective-C","Objective-J","ParaSail (programming language)","PARI/GP","Pascal (programming language)","PCASTL","Programming language for Computable Functions","PEARL (programming language)","PeopleCode","Perl","Perl Data Language","Perl 6","Pharo","PHP","Pico (programming language)","Picolisp","Pict (programming language)","Pike (programming language)","Prograph","PROIV","Prolog","PROMAL","Promela","PROSE modeling language","Protel","ProvideX","Pro*C","Pure (programming language)","PureScript (page does not exist)","Pure Data","Python (programming language)","Q (equational programming language)","Q (programming language from Kx Systems)","Qalb (programming language)","QtScript","QuakeC","Quantum programming","R (programming language)","R++","Racket (programming language)","RAPID","Rapira","Ratfiv","Ratfor","Rc","REBOL","Red (programming language)","Core War","REFAL","Reia (programming language)","REXX","Rlab","ROOP (programming language)","IBM RPG","RPL (programming language)","Robot Battle","RTL/2","Ruby (programming language)","RuneScape","Rust (programming language)","S (programming language)","Simula","Simulink","Singularity (operating system)","SISAL","SLIP (programming language)","SMALL","Smalltalk","Microsoft Small Basic","Standard ML","Strongtalk","Snap! (programming language)","SNOBOL","SPITBOL compiler","Snowball programming language","Secure Operations Language","Solidity","SPARK (programming language)","Speedcoding","Parallax Propeller","SP/k","IBM 1401 Symbolic Programming System","SQR","Squeak","Squirrel (programming language)","SR (programming language)","S/SL programming language","Stackless Python","Starlogo","Strand (programming language)","Stata","Stateflow","Subtext (programming language)","SuperCollider","SuperTalk","Swift (programming language)","Swift (parallel scripting language)","SYMPL","SyncCharts","SystemVerilog","T (programming language)","TACL","TACPOL (programming language)","TADS","Transaction Application Language","Tcl","Tea (programming language)","Text Editor and Corrector","TELCOMP","TeX","Text Executive Programming Language","Tensilica Instruction Extension","Timber (programming language)","TMG (language)","Tom (pattern matching language)","TOM (object-oriented programming language)","Toi (programming language)","Clarion (programming language)","Text Processing Utility","TRAC (programming language)","TTM (programming language)","Transact-SQL","Transcript (programming language)","TTCN","Turing (programming language)","TUTOR (programming language)","TXL (programming language)","TypeScript","Ubercode","UCSD Pascal","Umple","Unicon (programming language)","Uniface (programming language)","UNITY (programming language)","Unix shell","UnrealScript","Vala (programming language)","Verilog","VHDL","Visual Basic","Visual Basic .NET","Visual DataFlex","Visual DialogScript","Visual Fortran","Visual FoxPro","Visual J++","Visual J","Visual Objects","Visual Prolog","VSXu","Vvvv","WATFIV (programming language)","WebDNA","WebQL","Whiley (programming language)","Windows PowerShell","Winbatch","Wolfram Language","Wyvern (programming language)","X10 (programming language)","XBL","XC Programming Language","XCore XS1","XHarbour","XL (programming language)","Xojo","XOTcl","XPL","XPL0","XQuery","XSB","XSharp","XSL Transformations","XPath","Xtend","Yorick (programming language)","YQL (programming language)","Yoix","Z notation","Zeno (programming language)"]
		}
	}
}

</script>