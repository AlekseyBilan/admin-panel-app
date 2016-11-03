var adminPanelAppCtrl = adminPanelApp.controller("adminPanelAppCtrl", function ($scope) {
    $scope.articles = adminPanelModel.read();
    $scope.currentArticle = {"description": '', 'file': ''};

    $scope.$on("imgUploaded", function (event, args) {
        event.stopPropagation();
        if (args.id) {
            $scope.articles.forEach(function (e) {
                if (e.id == args.id) {
                    e.editFile = args.file;
                }
            });
        } else {
            $scope.currentArticle.file = args.file;
        }
    });

    $scope.addNewArticle = function () {
        if ($scope.currentArticle.file || $scope.currentArticle.description) {
            adminPanelModel.addItem($scope.currentArticle.file, $scope.currentArticle.description);
            $scope.clearArticleForm();
        }
    };

    $scope.userView = "templates/user.html";
    $scope.adminView = "templates/admin.html";
    $scope.url = $scope.adminView;

    $scope.goToUserPreview = function () {
        $scope.url = $scope.userView;
    };
    $scope.goToAdminPanel = function () {
        $scope.url = $scope.adminView;
    };

    $scope.removeArticle = function (articleId) {
        adminPanelModel.removeItem(articleId);
    };

    $scope.editArticle = function (articleId, editFile, editDescription) {
        adminPanelModel.updateItem(articleId, editFile, editDescription);
    };

    $scope.clearArticleForm = function () {
        $scope.currentArticle.description = '';
        $scope.currentArticle.file = '';
    };

});

