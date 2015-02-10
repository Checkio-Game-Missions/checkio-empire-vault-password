First we need a password for our new vault.
But it should be safe.

The password will be considered strong enough if its length is greater than or equal to 10 symbols,
it has at least one digit, as well as containing one uppercase letter and one lowercase letter in it.
The password contains only ASCII latin letters or digits.

You are given a password. Check is it corresponds to the rules?

**Input:** A password as a string. 

**Output:** Is the password safe or not as a boolean or any data type that can be
converted and processed as a boolean. In the results you will see the converted results.

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

If you are worried about the security of your app or service, you can check your users' passwords for complexity.
You can use these skills to require that your users passwords meet more conditions (punctuations or unicode).

**Precondition:**
```python
re.match("[a-zA-Z0-9]+", password)
0 < len(password) <= 64
```
