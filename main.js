Vue.component('tabs', {
	template: 
	`
	<div>
		<div class="tabs">
	  		<ul>
	    		<li :class="{ 'is-active': tab.isActive }" v-for="tab in tabs">
	      			<a :href="tab.href" @click="selectTab(tab)">
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
	}
});

var app = new Vue({
	el: '#root',
	data: {
		newNote: '',
		notes: []
	},
	methods: {
		addNote() {
			let note = this.newNote.trim();

      		if(note) {
        		this.notes.push({text: note, archived: false, isVisible: true});
        		this.newNote = '';
      		}
			//alert('Adding a Note!');
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