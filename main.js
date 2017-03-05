Vue.component('tabs', {
	template: 
	`
	<div>
		<div class="tabs">
	  		<ul>
	    		<li :class="{ 'is-active': tab.isActive }" v-for="tab in tabs">
	      			<a :href="tab.href" @click="selectTab(tab)">
	        			<span class="icon is-small"><i v-bind:class="tab.icon"></i></span>
	        			<span>{{ tab.name }}</span>
	      			</a>
	    		</li>
	  		</ul>
		</div>

		<div class="tabs-details">
			<slot></slot>
		</div>
	</div>
	`,
	data() {
		return { tabs: [] };
	},
	created() {
		this.tabs = this.$children;
	},
	methods: {
		selectTab(selectedTab) {
			this.tabs.forEach(tab => {
				tab.isActive = (tab.name == selectedTab.name);
			});
		}
	}
});

Vue.component('tab', {
	template:
	`
		<div v-show="isActive"><slot></slot></div>
	`,
	props: {
		name: { required: true }, 
		icon: { required: true },
		selected: { default: false }
	},
	data() {
		return { isActive: false }; 
	},
	computed: {
		href() {
			return '#' + this.name.toLowerCase();
		}
	},
	mounted() {
		this.isActive = this.selected;
		this.icon = this.icon;
	}
});

var app = new Vue({
	el: '#root',
	data: {
		newNote: '',
		notes: [],
		activeEdit: null
	},
	methods: {
		addNote() {
			let note = this.newNote.trim();

      		if(note) {
        		this.notes.push({text: note, archived: false, isVisible: true});
        		this.newNote = '';
      		}
			//alert('Adding a Note!');
		},
		editNote(note) {
      		this.activeEdit = note;
    	},
    	doneEdit(note) {
     		if (!this.activeEdit) {
        		return;
      		}
      		this.activeEdit = null;
      		note.text = note.text.trim();
    	}
	},
	computed: {
		nonArchivedNotes() {
  			return this.notes.filter(note => !note.archived && note.isVisible);
  		},
  		archivedNotes() {
  			return this.notes.filter(note => note.archived && note.isVisible);
  		}
  	}
});