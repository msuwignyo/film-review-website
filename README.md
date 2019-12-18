# Film Review

Ini adalah pair-project saya dengan Bayu Oktari dengan judul "Film Review Website".

## Tugas 17 Desember 2019

**Markus**
- Setup database

**Bayu**
- Buat wireframe

## Tugas 18 Desember 2019

**Markus**
- Seed data

**Bayu**
- Admin Control -- (userController)

## Driver Code

Driver code ini untuk menguji controller yang kami buat. Berikut ini daftar lengkapnya:

### CRUD User

**Create**

```bash
node admin.js user:create name "Markus Suwignyo" username "markus" password "12345" email "markussuwignyo@hacktiv8.com" role "user"
node admin.js user:create name "Bayu Oktari" username "bayu" password "54321" email "bayuoktari@hacktiv8.com" role "user"
node admin.js user:create name "Okka Linardi" username "okka" password "abcde" email "okkalinardi@hacktiv8.com" role "admin"
node admin.js user:create name "Riko Orlando" username "riko" password "edcba" email "rikoorlando@hacktiv8.com" role "user"
node admin.js user:create name "Dimas Wicaksono" username "dimas" password "numeric" email "dimaswicaksono@hacktiv8.com" role "admin"
```

**Read**

```bash
node admin.js user:read username "markus"
node admin.js user:read email "rikoorlando@hacktiv8.com"
node admin.js user:read id 2
node admin.js user:read all
```

**Update**

```bash
node admin.js user:update 1 username "suwignyo" password "jericho"
```

**Delete**

```bash
node admin.js user:delete 3
```

### CRUD Film

Hanya bisa diakses oleh admin

**Create**

```bash
node admin.js film:create 
```

**Read**

```bash
node admin.js user:read username "markus"
node admin.js user:read email "rikoorlando@hacktiv8.com"
node admin.js user:read id 2
node admin.js user:read all
```

**Update**

```bash
node admin.js user:update 1 username "suwignyo" password "jericho"
```

**Delete**

```bash
node admin.js user:delete 3
```