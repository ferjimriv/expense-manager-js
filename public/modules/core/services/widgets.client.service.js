'use strict';

angular.module('core').service('Widgets', [
	function() {

		// Define a set of default roles
		this.defaultRoles = ['user'];

		// Define the areas object
		this.areas = {};

		// A private function for rendering decision
		var shouldRender = function(user) {
			if (user) {
				for (var userRoleIndex in user.roles) {
					for (var roleIndex in this.roles) {
						if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
							return true;
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate area existance
		this.validateAreaExistance = function(areaId) {
			if (areaId && areaId.length) {
				if (this.areas[areaId]) {
					return true;
				} else {
					throw new Error('Area does not exists');
				}
			} else {
				throw new Error('AreaId was not provided');
			}

			return false;
		};

		// Validate area existance
		this.validateWidgetExistance = function(areaId, widgetId) {
			// Validate that the area exists
			this.validateAreaExistance(areaId);

			if (widgetId && widgetId.length) {
				if (this.areas[areaId].widgets[widgetId]) {
					return true;
				} else {
					throw new Error('Widget does not exists');
				}
			} else {
				throw new Error('WidgetId was not provided');
			}

			return false;
		};

		// Get the area object by area id
		this.getArea = function(areaId) {
			// Validate that the area exists
			this.validateAreaExistance(areaId);

			// Return the area object
			return this.areas[areaId];
		};

		// Add new area object by area id
		this.addArea = function(areaId, isPublic, roles) {
			// Create the new area
			this.areas[areaId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				widgets: {},
				shouldRender: shouldRender
			};

			// Return the area object
			return this.areas[areaId];
		};

		// Remove existing area object by area id
		this.removeArea = function(areaId) {
			// Validate that the area exists
			this.validateAreaExistance(areaId);

			// Return the area object
			delete this.areas[areaId];
		};

		// Add area widget object
		this.addWidget = function(areaId, widgetId, widgetIndex, widgetController, widgetView, widgetClass, isPublic, roles) {
			// Validate that the area exists
			this.validateAreaExistance(areaId);

			// Push new area widget
			this.areas[areaId].widgets[widgetIndex] = {
				id: widgetId,
				class: widgetClass,
				view: widgetView,
				controller: widgetController,
				isPublic: isPublic || this.areas[areaId].isPublic,
				roles: roles || this.defaultRoles,
				shouldRender: shouldRender
			};

			// Return the area object
			return this.areas[areaId];
		};

		// Remove existing area object by area id
		this.removeWidget = function(areaId, widgetId) {
			// Validate that the area exists
			this.validateWidgetExistance(areaId, widgetId);

			// Search for area widget to remove
			for (var widgetIndex in this.areas[areaId].widget) {
				if (this.areas[areaId].widget[widgetIndex].id === widgetId) {
					this.areas[areaId].widget.splice(widgetIndex, 1);
				}
			}
			// Return the area object
			return this.areas[areaId];
		};

		//Adding the home area
		this.addArea('home');
	}
]);