---
layout: default
title: Home
nav_order: 1
has_children: false
---

## Request access to LumApps Marketplace program

If you are interrested in, you can register to be part of the LumApps Marketplace program
<style>
.form {
    width        : 440px;
    height       : 520px;
    background   : #e6e6e6;
    border-radius: 8px;
    box-shadow   : 0 0 20px -10px #a9a9a9;
    margin       : auto;
    margin-top   : 80px;
    padding      : 20px 30px;
    max-width    : calc(100vw - 40px);
    box-sizing   : border-box;
    font-family  : 'Montserrat', sans-serif;
    position     : relative;
    font-size    : 13px;
}

.form .lumapps-logo {
    width         : 24px;
    margin-right  : 12px;
}

.form h2 {
    margin        : 10px 0;
    padding-bottom: 10px;
    width         : 200px;
    color         : #1a1c40;
    border-bottom : 3px solid #1a1c40
}

.form input {
    width        : 100%;
    padding      : 10px;
    box-sizing   : border-box;
    background   : none;
    outline      : none;
    resize       : none;
    border       : 0;
    font-family  : 'Montserrat', sans-serif;
    transition   : all .3s;
    border-bottom: 2px solid #1a1c40;
}

.form input:focus-within {
    border-bottom: 2px solid #245be7;
}

.form ::placeholder {
    color: #1a1c40;
}

p:before {
    content  : attr(type);
    display  : block;
    margin   : 28px 0 0;
    font-size: 14px;
    color    : #1a1c40
}

.form button {
    float      : right;
    padding    : 12px 18px;
    margin     : 8px 0 0;
    font-family: 'Montserrat', sans-serif;
    border     : 0px solid #78788c;
    border-radius: 4px;
    background : 0;
    color      : #1a1c40;
    font-weight: bold;
    background-color: #ffcf1e;
    cursor     : pointer;
    transition : all .3s
}

.form button:hover {
    background: #1a1c40;
    color     : #fff
}

.form div {
    content      : 'Hi';
    position     : absolute;
    bottom       : -15px;
    right        : -20px;
    background   : #50505a;
    color        : #fff;
    width        : 320px;
    padding      : 16px 4px 16px 0;
    border-radius: 6px;
    font-size    : 13px;
    box-shadow   : 10px 10px 40px -14px #000
}

.form span {
    margin: 0 5px 0 15px
}
</style>

<script>
    function submitForm() {
        const form = document.querySelector('form[name="contact_form"]');
        const userName = form.elements['name'].value;
        const userEmail = form.elements['email'].value;
        const companyName = form.elements['company'].value;
        const companyWebsite = form.elements['companyWebsite'].value;
        const body = `A new MP Program request from ${userName} (${userEmail}) - ${companyName} (${companyWebsite})`;
        

        const email = 'marketplace-support@lumapps.com'; 
        const subject = `Marketplace programm request - ${companyName}`;
        
        const mail = document.createElement("a");
        mail.target = "_blank";
        mail.href = `mailto:${email}?body=${encodeURIComponent(body)}&subject=${encodeURIComponent(subject)}`;
        mail.click();
    }
</script>

<form class="form" name="contact_form" onSubmit="submitForm()">
    <h2><img class="lumapps-logo" src="https://static.crozdesk.com/web_app_library/providers/logos/000/004/430/original/lumapps-1559230943-logo.png?1559230943"/>CONTACT US</h2>
    <p type="Name:">
        <input placeholder="Write your name here.." name="name"/>
    </p>
    <p type="Email:">
        <input placeholder="Let us know how to contact you back.." name="email"/>
    </p>
    <p type="Company:">
        <input placeholder="Write your campany name here..." name="company"/>
    </p>
    <p type="Company website:">
        <input placeholder="Write your campany website URL name here..." name="companyWebsite"/>
    </p>
    <button type="submit">Submit</button>
</form>
