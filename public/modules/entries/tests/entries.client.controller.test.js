'use strict';

(function() {
	// Entries Controller Spec
	describe('Entries Controller Tests', function() {
		// Initialize global variables
		var EntriesController,
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

			// Initialize the Entries controller.
			EntriesController = $controller('EntriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Entry object fetched from XHR', inject(function(Entries) {
			// Create sample Entry using the Entries service
			var sampleEntry = new Entries({
				name: 'New Entry'
			});

			// Create a sample Entries array that includes the new Entry
			var sampleEntries = [sampleEntry];

			// Set GET response
			$httpBackend.expectGET('entries').respond(sampleEntries);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.entries).toEqualData(sampleEntries);
		}));

		it('$scope.findOne() should create an array with one Entry object fetched from XHR using a entryId URL parameter', inject(function(Entries) {
			// Define a sample Entry object
			var sampleEntry = new Entries({
				name: 'New Entry'
			});

			// Set the URL parameter
			$stateParams.entryId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/entries\/([0-9a-fA-F]{24})$/).respond(sampleEntry);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.entry).toEqualData(sampleEntry);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Entries) {
			// Create a sample Entry object
			var sampleEntryPostData = new Entries({
				name: 'New Entry'
			});

			// Create a sample Entry response
			var sampleEntryResponse = new Entries({
				_id: '525cf20451979dea2c000001',
				name: 'New Entry'
			});

			// Fixture mock form input values
			scope.name = 'New Entry';

			// Set POST response
			$httpBackend.expectPOST('entries', sampleEntryPostData).respond(sampleEntryResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Entry was created
			expect($location.path()).toBe('/entries/' + sampleEntryResponse._id);
		}));

		it('$scope.update() should update a valid Entry', inject(function(Entries) {
			// Define a sample Entry put data
			var sampleEntryPutData = new Entries({
				_id: '525cf20451979dea2c000001',
				name: 'New Entry'
			});

			// Mock Entry in scope
			scope.entry = sampleEntryPutData;

			// Set PUT response
			$httpBackend.expectPUT(/entries\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/entries/' + sampleEntryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid entryId and remove the Entry from the scope', inject(function(Entries) {
			// Create new Entry object
			var sampleEntry = new Entries({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Entries array and include the Entry
			scope.entries = [sampleEntry];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/entries\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEntry);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.entries.length).toBe(0);
		}));
	});
}());