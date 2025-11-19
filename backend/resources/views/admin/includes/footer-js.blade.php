<!-- begin::Quick Panel -->

<!-- end::Quick Panel -->

<!-- begin::Scrolltop -->
<div id="kt_scrolltop" class="kt-scrolltop">
    <i class="fa fa-arrow-up"></i>
</div>

<script src="{{ asset('admin-asset/js/admin-main.js') }}"></script>
<script src="{{ asset('admin-asset/js/ckeditor.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/js/select2.min.js"></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/intlTelInput-jquery.min.js'></script>

<script>
    $(document).ready(function() {
        function timeAgo(date) {
            const now = new Date();
            const seconds = Math.floor((now - new Date(date)) / 1000);
            const rtf = new Intl.RelativeTimeFormat('en', {
                numeric: 'auto'
            });

            if (seconds < 60) return rtf.format(-seconds, 'second');
            if (seconds < 3600) return rtf.format(-Math.floor(seconds / 60), 'minute');
            if (seconds < 86400) return rtf.format(-Math.floor(seconds / 3600), 'hour');
            if (seconds < 604800) return rtf.format(-Math.floor(seconds / 86400), 'day');
            if (seconds < 2419200) return rtf.format(-Math.floor(seconds / 604800), 'week');
            if (seconds < 29030400) return rtf.format(-Math.floor(seconds / 2419200), 'month');
            return rtf.format(-Math.floor(seconds / 29030400), 'year');
        }

        function fetchAllNotifications() {
            $.ajax({
                url: '{{ route('admin.notification.unread') }}',
                method: 'GET',
                success: function(data) {
                    // Update general notifications
                    $('#notificationBadgeCount').text(data.unreadCount);
                    updateNotificationList(data.unreadList, '.custom_notify',
                        '.no-notifications-message');

                    // Update dashboard notifications
                    updateNotificationList(data.unreadList, '.custom_notifys', '.dashboard-list');
                }
            });
        }

        function updateNotificationList(notifications, listSelector, emptyMessageSelector) {
            let listHtml = '';

            notifications.forEach(function(notification) {
                // Determine the icon based on the notification type
                let iconHtml = '';
                switch (notification.type) {
                    case 'contact_us':
                        iconHtml = `<i class="fa fa-envelope"></i>`;
                        break;
                    case 'talent_seeker':
                        iconHtml = `<i class="fa fa-user-tie"></i>`;
                        break;
                    case 'submit_role':
                        iconHtml = `<i class="fa fa-briefcase"></i>`;
                        break;
                    case 'apply_job':
                        iconHtml = `<i class="fa fa-clipboard-list"></i>`;
                        break;
                    default:
                        iconHtml = `<i class="fa fa-bell"></i>`;
                }

                // Add the HTML for each notification
                listHtml += `<a href="{{ url('authority/notification/notification-redirect') }}/${notification.id}" class="kt-notification__item">
                <div class="kt-notification__item-icon">
                    ${iconHtml} <!-- Insert icon dynamically based on notification type -->
                </div>
                <div class="kt-notification__item-details">
                    <div class="kt-notification__item-title">${notification.title}</div>
                    <div class="kt-notification__item-time">${timeAgo(notification.created_at)}</div>
                </div>
            </a>`;
            });

            // Update the notification list based on whether there are notifications or not
            if (notifications.length > 0) {
                $(listSelector).html(listHtml);
                $(emptyMessageSelector).hide();
            } else {
                $(listSelector).html('');
                $(emptyMessageSelector).show();
            }
        }

        setInterval(fetchAllNotifications, 1000);
        fetchAllNotifications();

    });
</script>
