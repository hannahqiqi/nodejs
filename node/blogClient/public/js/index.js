$(function() {
	loadPost()
})

function addPost() {
	var post = $("#post").val()
	if(post.length === 0) {
		alert("请输入内容")
		return
	}
	$.post("http://localhost:2000/blog", {post:post}, function(data) {
		$("#post").val("")
		loadPost()
	})
}

function loadPost() {
	$.get("http://localhost:2000/blogs", function(data) {
		var html = ""
		for (var item of data) {
			var localTime = moment(item.postTime).format('YYYY-MM-DD HH:mm')
			html += `<li>${item.post}&nbsp;${localTime} <a href='javascript:void(0);' onclick="delPost('${item._id}')">删除</a></li>`
		}
		$("#blogs").html(html)
	})
}

function delPost(postId) {

	$.get('http://localhost:2000/delblog', {id: postId}, function(data) {
		 var post = $("#post").val()
		 $("#post").val("")
		 loadPost()
	})
}

function searchPost() {
	$.get("http://localhost:2000/searchblog", function(data) {
		 var post = $("#post").val()
		 loadPost()
	})
}