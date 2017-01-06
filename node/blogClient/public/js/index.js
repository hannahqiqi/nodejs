$(function() {
  loadPost()
})

function addPost() {
  var post = $("#post").val()
  if (post.length === 0) {
    alert("请输入内容")
    return
  }
  $.post("http://localhost:2000/blog", { post: post }, function(data) {
    $("#post").val("")
    loadPost()
  })
}

function loadPost() {
  $.get("http://localhost:2000/blogs", function(data) {
    var html = ""
    for (var item of data) {
      var localTime = moment(item.postTime).format('YYYY-MM-DD HH:mm')
      html += `<li>${item.post}&nbsp;${localTime} <button type="button" class="btn btn-default" style="border:none" onclick="delPost('${item._id}')">删除</button>
      <button type="button" class="btn btn-default" style="border:none" onclick="editPost('${item._id}', '${item.post}')">编辑</button></li>`
    }
    $("#blogs").html(html)
  })
}

function delPost(postId) {
  $.get('http://localhost:2000/delblog', { id: postId }, function(data) {
    loadPost()
  })
}

function searchPost() {
  var content = $("#content").val()
  console.log(content)
  $.get("http://localhost:2000/searchblog", { dta: content }, function(data) {
    console.log(data)
    var html = ""
    for (var item of data) {
      var localTime = moment(item.postTime).format('YYYY-MM-DD HH:mm')
      html += `<li>${item.post}&nbsp;${localTime} <button type="button" class="btn btn-default" style="border:none" onclick="delPost('${item._id}')">删除</button></li>`
      $("#blogs").html(html)
    }
  })
}

function editPost(postId, content) {
  $('#newid').val(postId)
  $('#newcontent').val(content)
  $('#myModal').modal('show')
}

function updatePost() {
  var id = $('#newid').val()
  var content = $('#newcontent').val()
  $.get("http://localhost:2000/updateblog", { id: id, dta: content }, function(data) {
    // alert(id)
    // alert(content)
    loadPost()
    $('#myModal').modal('hide')
  })
}
