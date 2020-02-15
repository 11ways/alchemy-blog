/**
 * The BlogPostComment Model class
 *
 * @constructor
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    1.0.0
 * @version  1.0.0
 */
var Comment = Function.inherits('Alchemy.Model', function BlogPostComment(conduit, options) {
	BlogPostComment.super.call(this, conduit, options);
});

/**
 * Constitute the class wide schema
 *
 * @author   Jelle De Loecker   <jelle@develry.be>
 * @since    1.0.0
 * @version  1.0.0
 */
Comment.constitute(function addFields() {

	// Every comment belongs to a blogpost
	this.belongsTo('BlogPost');

	// Every comment can also belong to a parent comment
	this.belongsTo('ParentComment', 'BlogPostComment');

	// Comments can also belong to logged-in users
	this.belongsTo('User');

	this.addField('name', 'String');
	this.addField('email', 'String');
	this.addField('website', 'String');
	this.addField('body', 'Text');
	this.addField('time_on_page', 'Number');

	// Ip address
	this.addField('ip', 'String');

	// User agent
	this.addField('user_agent', 'String');

	// Migration id
	this.addField('migration_id', 'String');

	// Type of comment (for pingbacks)
	this.addField('type', 'String');

	// Possible spam?
	this.addField('possible_spam', 'Boolean');

	// Confirmed spam?
	this.addField('spam', 'Boolean');

	// Validation rules
	this.addRule('name', 'notEmpty');
	// this.addRule('email', 'email');
	// this.addRule('website', 'URL');
	this.addRule('body', 'notEmpty');
});

/**
 * Configure chimera for this model
 *
 * @author   Jelle De Loecker <jelle@develry.be>
 * @since    1.0.0
 * @version  1.0.0
 */
Comment.constitute(function chimeraConfig() {

	var list,
	    edit;

	if (!this.chimera) {
		return;
	}

	// Get the list group
	list = this.chimera.getActionFields('list');

	list.addField('user_id');
	list.addField('name');
	list.addField('email');
	list.addField('website');
	list.addField('body');

	// Get the edit group
	edit = this.chimera.getActionFields('edit');

	edit.addField('user_id');
	edit.addField('name');
	edit.addField('email');
	edit.addField('website');
	edit.addField('body');
});
