(function() {
    var css, updateTask, updateTasks,
        _this = this;

    css = ".requester { font-size: 0.9em; position: absolute; left: 145px; top: 2px; text-align: right; }";

    $('<style>').html(css).appendTo('head');

    updateTask = function(task) {
        var $task, users, user;
        task = task.model;

        users = task.board.users.models;

        user = jQuery.grep(users, function( u ) {
          return u.id == task.attributes.created_by_id;
        })[0];

        $task = $('#task_' + task.attributes.id);
        if ($task) {
            if ($task.find('.requester').length > 0) {
                return $task.find('.requester').text(user.attributes.initials);
            } else {
                console.log($task.find('.status_pane'));

                return $task.find('.status_pane').prepend('<span class="requester">' + user.attributes.initials + '</span>');
            }
        }
    };

    updateTasks = function() {
        return window.board.tasks.forEach(function(task) {
            return updateTask(task);
        });
    };

    setTimeout(updateTasks, 1000);

    setInterval(updateTasks, 60000);

    window.board.on('task:render', updateTask);

}).call(this);
