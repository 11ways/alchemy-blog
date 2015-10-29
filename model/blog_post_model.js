/**
 * The BlogPost Model class
 *
 * @constructor
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    1.0.0
 * @version  1.0.0
 */
var Blog = Function.inherits('Model', function BlogPostModel(conduit, options) {
	BlogPostModel.super.call(this, conduit, options);
});

/**
 * Constitute the class wide schema
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    1.0.0
 * @version  1.0.0
 */
Blog.constitute(function addFields() {

	// Post title
	this.addField('title', 'String', {translatable: true});

	// Teaser text (intro & index text)
	this.addField('teaser', 'Text', {translatable: true});

	// Main article
	this.addField('body', 'Text', {translatable: true});

	// Ârticle publish date (won't appear before this date, either)
	this.addField('publish_date', 'Datetime', {default: Date.create});

	// Teaser files
	this.addField('teaser_file', 'File');

	// Main files
	this.addField('main_file', 'File');

	// Attachments
	this.addField('attachments', 'File', {array: true});

	// Migration id
	this.addField('migration_id', 'String');

	// Is it on-line?
	this.addField('online', 'Boolean');

	// Every blog post has an author (a user)
	this.belongsTo('Author', 'User');

	// Blog posts can have multiple tags
	this.hasAndBelongsToMany('Tag');

	// Blog posts have many comments
	this.hasMany('Comments', 'BlogPostComment');

	// Add the sluggable behaviour
	this.addBehaviour('Sluggable');

	// Add the publishable behaviour
	this.addBehaviour('Publishable');
});

/**
 * Configure chimera for this model
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    1.0.0
 * @version  1.0.0
 */
Blog.constitute(function chimeraConfig() {

	var list,
	    edit;

	if (!this.chimera) {
		return;
	}

	// Get the list group
	list = this.chimera.getActionFields('list');

	list.addField('author_id');
	list.addField('title');
	list.addField('online');
	list.addField('publish_date');
	list.addField('tag_id');

	// Get the edit group
	edit = this.chimera.getActionFields('edit');

	edit.addField('author_id');
	edit.addField('title');
	edit.addField('teaser');
	edit.addField('body');
	edit.addField('online');
	edit.addField('publish_date');
	edit.addField('teaser_file');
	edit.addField('main_file');
	edit.addField('attachments');
	edit.addField('slug');
	edit.addField('tag_id', {create: true});
});

/**
 * The default sort options
 *
 * @type {Object}
 */
Blog.setProperty('sort', {publish_date: -1});