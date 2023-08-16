# Cliqly Automation

This repository serves as a base for automating email sending on the [Cliqly](https://turnkeyemailbiz.net/cliqlytrialv1?c=396133) platform.

1. Create an account on [Cliqly](https://turnkeyemailbiz.net/cliqlytrialv1?c=396133) using [this link](https://turnkeyemailbiz.net/cliqlytrialv1?c=396133), or take note of your login information
2. Create an account on github
3. [Fork](https://github.com/cliqly-automation/cliqly/fork) This repository
4. Go under Settings > Secrets and variables > Actions
5. Click "New repository secret"  
   Set **LOGIN** as Name*.  
   Set **your Cliqly email** as Secret*  
   Click "Add secret" 
   Click "New repository secret" again  
   Set **PASSWORD** as Name*.  
   Set **your Cliqly password** as Secret*  
6. Everything should be set up

Now at around 11.00, 11.30, 12.00, 12.30, 17.00, 17.30, 18.00, 18.30 UTC time the script should fire and send the mails for you.  
You can update the scheduled time editing `node.yml` under `.github/worflows/node.yml` on line `8`.

---

Happy mailing  

---
Cliqly affiliate link: https://turnkeyemailbiz.net/cliqlytrialv1?c=396133