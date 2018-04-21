/*
 * The tasks reducer will always return an array of tasks no matter what
 * You need to return something, so if there are no tasks then just return an empty array
 * */
import $ from 'jquery';
import Interval from 'real-interval';
var jsontree = [];
var getData = function(){
  $.ajax({
    url: 'http://127.0.0.1:8000/list/?format=json',
    type: 'get',
    dataType: 'json',
    async:false,
    success: function(r) {
      jsontree = eval(r);
    },
    error: function(XMLHttpRequest, textStatus) {
      alert(XMLHttpRequest.status);
      alert(XMLHttpRequest.readyState);
      alert(textStatus);
      alert('fail');
      // return jsontree;
    }
  });
}

export default function (state = null, action) {
  getData();
  var priorityup = function(x,y)
    {
        return (x['priority'] > y['priority']) ? 1 : -1
    }
  var prioritydown = function(x,y)
    {
        return (x['priority'] < y['priority']) ? 1 : -1
    }
  var deadlineup = function(x,y)
    {
        return (x['expire_date'] > y['expire_date']) ? 1 : -1
    }
  var deadlinedown = function(x,y)
    {
        return (x['expire_date'] < y['expire_date']) ? 1 : -1
    }
  var doneDown = function(x,y)
    {
        return (x['status'] > y['status']) ? 1 : -1
    }
  jsontree.sort(doneDown);
  switch (action.type) {
    case 'SORT_PRIORITY_UP':
      jsontree.sort(priorityup).sort(doneDown);
      break;
    case 'SORT_PRIORITY_DOWN':
      jsontree.sort(prioritydown).sort(doneDown);
      break;
    case 'SORT_DEADLINE_UP':
      jsontree.sort(deadlineup).sort(doneDown);
      break;
    case 'SORT_DEADLINE_DOWN':
      jsontree.sort(deadlinedown).sort(doneDown);
      console.log(jsontree);
      break;
    case 'TASK_SELECTED':
      getData();
      jsontree.sort(doneDown);
      break;
    case 'TASK_DELETED':
      var task = action.payload;
      $.ajax({
        url: 'http://127.0.0.1:8000/list/'+task['id'] + '.json',
        type: 'DELETE',
        dataType: 'json',
        crossDomain : true,
        headers: { 'Authorization': "Token " + localStorage.token },
        xhrFields: {
          withCredentials: true
        },
        data: task,
        async:false,
        success: function(r) {
          console.log('Success DELETE')
        },
        error: function() {
          console.log('Fail DELETE')
          // return jsontree;
        }
      });
      getData();
      jsontree.sort(doneDown);
      break;
    case 'TASK_ADDED':
      var task = action.payload;
      $.ajax({
        url: 'http://127.0.0.1:8000/list/',
        type: 'POST',
        dataType: 'json',
        crossDomain : true,
        headers: { 'Authorization': "Token " + localStorage.token },
        xhrFields: {
          withCredentials: true
        },
        data: task,
        success: function(r) {
          console.log(task);
          console.log('Success POST')
        },
        error: function(XMLHttpRequest, textStatus) {
          alert(XMLHttpRequest.status);
          alert(XMLHttpRequest.readyState);
          alert(textStatus);
          alert('fail');
          // return jsontree;
        }
      });
      getData();
      jsontree.sort(doneDown);
      break;
    case 'TASK_EDITED':
      var task = action.payload;
      $.ajax({
        url: 'http://127.0.0.1:8000/list/'+task['id'] + '.json',
        type: 'PUT',
        dataType: 'json',
        crossDomain : true,
        headers: { 'Authorization': "Token " + localStorage.token },
        xhrFields: {
          withCredentials: true
        },
        data: task,
        async:false,
        success: function(r) {
          console.log(task);
          console.log('Success PUT')
        },
        error: function() {
          console.log(task);
          console.log('Fail PUT')
          // return jsontree;
        }
      });
      getData();
      jsontree.sort(doneDown);
      break;
    case 'TASK_DONE':
      var task = action.payload;
      task["status"] = 1;
      $.ajax({
        url: 'http://127.0.0.1:8000/list/' + task['id'] + '.json',
        type: 'PUT',
        dataType: 'json',
        crossDomain : true,
        headers: { 'Authorization': "Token " + localStorage.token },
        xhrFields: {
          withCredentials: true
        },
        data: task,
        async:false,
        success: function(r) {
          console.log(task);
          console.log('Success PUT')
        },
        error: function() {
          console.log(task);
          console.log('Fail PUT')
          // return jsontree;
        }
      });
      getData();
      jsontree.sort(doneDown);
      break;
  }
  return jsontree;

}
