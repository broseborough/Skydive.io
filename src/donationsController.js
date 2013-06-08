function donationsController($scope){
	$scope.lastDonationRequest = new Date(localStorage.getItem("lastDonationRequest")) || null;
	if($scope.lastDonationRequest === null){
		$scope.setLastRequestDate();
	}
	$scope.timeSinceLastDonationRequest = function(){
		var now = new Date();
		return now - $scope.lastDonationRequest;
	};
	$scope.shouldShowRequest = function(){
		return $scope.timeSinceLastDonationRequest() > 604800000;
	};
	$scope.setLastRequestDate = function(){
		$scope.lastDonationRequest = new Date();
		localStorage.setItem("lastDonationRequest", $scope.lastDonationRequest);
	};
}
donationsController.$inject = ['$scope'];