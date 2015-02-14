We've installed a new vault to contain our valuable resources and treasures, but before we can put anything into it, we need a suitable password for our new vault. One that should be as safe as possible.

The password will be considered strong enough if its length is greater than or equal to 10 characters,
it contains at least one digit, as well as at least one uppercase letter and one lowercase letter.
The password may only contain ASCII latin letters or digits, no symbols.

You are given a password. We need your code to verify if it meets the conditions for a secure password.

**Input:** A password as a string. 

**Output:** A determination if the password safe or not as a boolean, or any data type that can be
converted and processed as a boolean. When the results process, you will see the converted results.

**Example:**

```python
is_safe('A1213pokl') == False
is_safe('bAse730onE') == True
is_safe('asasasasasasasaas') == False
is_safe('QWERTYqwerty') == False
is_safe('123456123456') == False
is_safe('QwErTy911poqqqq') == True
```

**How it is used:**

If you are worried about the security of your app or service, you can use this handy code to personally check your users' passwords for complexity.
You can further use these skills to require that your users passwords meet or include even more conditions, punctuation or unicode.

**Precondition:**
```python
re.match("[a-zA-Z0-9]+", password)
0 < len(password) <= 64
```
