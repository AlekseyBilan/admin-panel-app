var adminPanelModel = (function () {

    var _data = [];

    function _addItem(file, description) {
        _data.push({
            id: new Date().getTime(),
            description: description,
            file: file
        });
        _save();
    }

    function _removeItem(id) {
        _data.forEach(function (e, index) {
            if (e.id == id) {
                _data.splice(index, 1);
            }
        });
        _save();
    }

    function _updateItem(id, file, description) {
        _data.forEach(function (e, index) {
            if (e.id == id) {
                if (_data[index].description != description) {
                    _data[index].description = description;
                }
                if (_data[index].file != file) {
                    _data[index].file = file;
                }
            }
        });
        _save();
    }

    function _save() {
        window.localStorage["articles"] = JSON.stringify(_data, function (key, val) {
            if (key == '$$hashKey') {
                return undefined;
            }
            return val
        });
    }

    function _read() {
        var temp = window.localStorage["articles"];
        if (!temp) _data = [];
        else _data = JSON.parse(temp);
        _data.forEach(function (e, index) {
            _data[index].editFile = _data[index].file;
            _data[index].editDescription = _data[index].description;
        });
        return _data;

    }

    return {
        data: _data,
        addItem: _addItem,
        updateItem: _updateItem,
        removeItem: _removeItem,
        save: _save,
        read: _read
    };
})();