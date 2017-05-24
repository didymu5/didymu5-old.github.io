(function() {
	var circle_logo = document.getElementsByClassName('hg-header-logo-image--circle')[0];
	circle_logo && scroll_to_shrink_header();

	function scroll_to_shrink_header() {
		var last_known_scroll_position = 0;
		var ticking = false;

		function transformHeader(scroll_pos) {

			if(scroll_pos > 40) {
				if (document.getElementsByClassName('circle--shrink').length === 0) {
					document.getElementsByClassName('hg-header')[0]
					// circle_logo.classList.value += ' circle--shrink circle--position-left';
				}
				if (scroll_pos < 40) {
					// console.log(scroll_pos);
				}
				return;
			}
		}

		window.addEventListener('scroll', function(e) {
			last_known_scroll_position = window.scrollY;
			if (!ticking) {
				window.requestAnimationFrame(function() {
					transformHeader(last_known_scroll_position);
					ticking = false;
				});
			}
			ticking = true;
		});
	}
})()
