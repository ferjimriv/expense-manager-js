'use strict';

(function() {
	// Widgets Controller Spec
	describe('Widgets Controller Tests', function() {
		// Initialize global variables
		var WidgetsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Widgets controller.
			WidgetsController = $controller('WidgetsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Widget object fetched from XHR', inject(function(Widgets) {
			// Create sample Widget using the Widgets service
			var sampleWidget = new Widgets({
				name: 'New Widget'
			});

			// Create a sample Widgets array that includes the new Widget
			var sampleWidgets = [sampleWidget];

			// Set GET response
			$httpBackend.expectGET('widgets').respond(sampleWidgets);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.widgets).toEqualData(sampleWidgets);
		}));

		it('$scope.findOne() should create an array with one Widget object fetched from XHR using a widgetId URL parameter', inject(function(Widgets) {
			// Define a sample Widget object
			var sampleWidget = new Widgets({
				name: 'New Widget'
			});

			// Set the URL parameter
			$stateParams.widgetId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/widgets\/([0-9a-fA-F]{24})$/).respond(sampleWidget);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.widget).toEqualData(sampleWidget);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Widgets) {
			// Create a sample Widget object
			var sampleWidgetPostData = new Widgets({
				name: 'New Widget'
			});

			// Create a sample Widget response
			var sampleWidgetResponse = new Widgets({
				_id: '525cf20451979dea2c000001',
				name: 'New Widget'
			});

			// Fixture mock form input values
			scope.name = 'New Widget';

			// Set POST response
			$httpBackend.expectPOST('widgets', sampleWidgetPostData).respond(sampleWidgetResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Widget was created
			expect($location.path()).toBe('/widgets/' + sampleWidgetResponse._id);
		}));

		it('$scope.update() should update a valid Widget', inject(function(Widgets) {
			// Define a sample Widget put data
			var sampleWidgetPutData = new Widgets({
				_id: '525cf20451979dea2c000001',
				name: 'New Widget'
			});

			// Mock Widget in scope
			scope.widget = sampleWidgetPutData;

			// Set PUT response
			$httpBackend.expectPUT(/widgets\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/widgets/' + sampleWidgetPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid widgetId and remove the Widget from the scope', inject(function(Widgets) {
			// Create new Widget object
			var sampleWidget = new Widgets({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Widgets array and include the Widget
			scope.widgets = [sampleWidget];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/widgets\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleWidget);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.widgets.length).toBe(0);
		}));
	});
}());