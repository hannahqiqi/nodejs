$(function() {
	loadPost()
})

function addPost() {
	var post = $("#post").val()
	if(post.length === 0) {
		alert("请输入内容")
		return
	}
	$.post("http://localhost:2000/blog", {post: post, postTime: Date()}, function(data) {
		$("#post").val("")
		loadPost()
	})
}

function loadPost() {
	$.get("http://localhost:2000/blogs", function(data) {
		var html = ""
		for (var item of data) {
			html += `<li>${item.post}&nbsp;${item.postTime}</li>`
		}
		$("#blogs").html(html)
	})
}