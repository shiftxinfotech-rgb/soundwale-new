<!DOCTYPE HTML
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Event Notification</title>
    <style>
        body {
            font-family: Arial, Helvetica Neue, Helvetica, sans-serif !important
        }
    </style>
</head>

<body>
    <div>
        <section
            style="background: rgba(255, 255, 255, 1); font-family: &quot;Poppins&quot;, sans-serif !important; width: 700px; margin: 20px auto; border-radius: 16px; padding: 30px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19)">
            <div>
                <ul style="margin: 0; padding: 0; text-align: center">
                    <li style="list-style-type: none; display: inline-block; margin-right: 10px">
                        <img src="{{ asset('admin-asset/images/logo.png') }}" alt="{{ config('app.name') }}">
                    </li>

                </ul>
            </div>
            <hr style="border: none; border-top: 1px solid #dddddd; margin: 20px 0;">
            <div>
                <h3
                    style="font-size: 16px; font-weight: 500; line-height: 27px; text-align: left; color: rgba(0, 0, 0, 1)">
                    👋 Hello {{ $usersMailData['to_name'] }},
                </h3>

                <p
                    style="font-size: 16px; font-weight: 500; line-height: 27px; text-align: left; color: rgba(0, 0, 0, 1)">
                </p>
                <p>We received your application through our Submit Role. Below are the details you provided:</p>
                <p></p>

                <p
                    style="font-size: 16px; font-weight: 500; line-height: 27px; text-align: left; color: rgba(0, 0, 0, 1)">

                </p>
                <p
                    style="color: rgba(0, 0, 0, 1); font-size: 14px; font-weight: 400; line-height: 24px; text-align: left">
                    Submit Role Information: </p>
                <ul style="margin: 0; padding: 0 0 0 20px">
                    <li
                        style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px">
                        <strong>Job :</strong> <span
                            style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px; text-align:justify">
                            {{ $usersMailData['job'] }} </span>
                    </li>
                    <li
                        style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px">
                        <strong>Hires :</strong> <span
                            style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px; text-align:justify">
                            {{ $usersMailData['hires'] }}</span>
                    </li>
                    <li
                        style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px">
                        <strong>Job Description :</strong> </br></br><span
                            style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px; text-align:justify">
                            {{ $usersMailData['job_description'] }}</span>
                    </li>
                    <li
                        style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px">
                        <strong>Time :</strong><span
                            style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px; text-align:justify">
                            {{ $usersMailData['time'] }}</span>
                    </li>
                    <li
                        style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px">
                        <strong>Location :</strong><span
                            style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px; text-align:justify">
                            {{ $usersMailData['location'] }}
                        </span>
                    </li>
                    <li
                        style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px">
                        <strong>Salary :</strong><span
                            style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px; text-align:justify">
                            {{ $usersMailData['salary'] }}</span>
                    </li>
                    <li
                        style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px">
                        <strong>Start Date :</strong><span
                            style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px; text-align:justify">
                            {{ $usersMailData['start_date'] }}</span>
                    </li>
                    <li
                        style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px">
                        <strong>Name :</strong><span
                            style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px; text-align:justify">
                            {{ $usersMailData['to_name'] }}</span>
                    </li>
                    <li
                        style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px">
                        <strong>Business :</strong><span
                            style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px; text-align:justify">
                            {{ $usersMailData['business'] }}</span>
                    </li>
                    <li
                        style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px">
                        <strong>Email :</strong><span
                            style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px; text-align:justify">
                            <a
                                href="mailto:{{ $usersMailData['to_email'] }}">{{ $usersMailData['to_email'] }}</a></span>
                    </li>
                    <li
                        style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px">
                        <strong>Phone Number :</strong><span
                            style="font-size: 12px; font-weight: 400; line-height: 12px; text-align: left; color: rgba(90, 104, 114, 1); margin-bottom: 16px; text-align:justify">
                            {{ $usersMailData['to_phone'] }}</span>
                    </li>
                </ul>
                <p></p>

                <p
                    style="font-size: 16px; font-weight: 500; line-height: 27px; text-align: left; color: rgba(0, 0, 0, 1)">

                    Thank you,<br>
                    for reaching out to us. Our team will review your application and get in touch with you soon,<br>
                    {{ config('app.name') }}
                </p>
            </div>
            <hr style="border: none; border-top: 1px solid #dddddd; margin: 20px 0;">
            <div>
                <ul style="margin: 0; padding: 0; text-align: center">
                    <li style="list-style-type: none; display: inline-block; margin-right: 10px">
                        <img src="{{ asset('admin-asset/images/favicon.ico') }}" alt="{{ config('app.name') }}"
                            style="height: 24px; width: 24px">
                    </li>
                </ul>
            </div>
            <div>
                <p
                    style="font-size: 16px; font-weight: 500; line-height: 27px; text-align: center; color: rgba(0, 0, 0, 1)">
                    {{ config('app.name') }}<br>
                    If you have any questions or require further assistance please contact us,<br>
                    © {{ date('Y') }} {{ config('app.name') }}. All rights reserved
                </p>
            </div>

        </section>
    </div>
</body>

</html>
