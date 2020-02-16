# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.1](https://github.com/kdaghari/eggnite-frontend/compare/v2.0.0...v2.0.1) (2020-02-16)

## [2.0.0](https://github.com/kdaghari/eggnite-frontend/compare/v1.4.0...v2.0.0) (2020-02-16)


### ⚠ BREAKING CHANGES

* it's no longer doing it on the FE but rather fetching a signedUrl on the BE and then sending in the put request through that signed url
* no longer using custom event as a way to refetch the whole page, but rather optimistically update the comments array
* changed field name from gender to sex

### Features

* add helpful message for !404 errors ([3e5c41f](https://github.com/kdaghari/eggnite-frontend/commit/3e5c41fd4f38398d6a6ed4bcf09f030122eba992))
* add image deletion ([f62522e](https://github.com/kdaghari/eggnite-frontend/commit/f62522ea62d5c07177f11a5dc6b7e340fc8444ac))
* add infinite scrolling ([4dfcfe9](https://github.com/kdaghari/eggnite-frontend/commit/4dfcfe92d2422c3d8babdb4cc83f9f4071bcb410))
* add polling ([3c2f342](https://github.com/kdaghari/eggnite-frontend/commit/3c2f3426d315d6b078563bc974c5651e2b48dff0))
* **wip:** add pagination support ([6aed025](https://github.com/kdaghari/eggnite-frontend/commit/6aed02529ffbea24a83cb692cfc78cdbba054f57))
* add comment deletion ([a6f8b63](https://github.com/kdaghari/eggnite-frontend/commit/a6f8b63071a610ddd1aef19ff21a754e97d4841d))
* add comment reply ([e7e74f5](https://github.com/kdaghari/eggnite-frontend/commit/e7e74f56b41ff4be29797bad88043abaf1b8e538))
* add company field ([193c0fc](https://github.com/kdaghari/eggnite-frontend/commit/193c0fc12634a385ea601c404f95899be8fe1127))
* add country field ([8155ceb](https://github.com/kdaghari/eggnite-frontend/commit/8155ceb270cd1e1bb1c7cbd21f0dbcc22c99eb58))
* add products table ([4d2744f](https://github.com/kdaghari/eggnite-frontend/commit/4d2744f4477f19e7f4e0fe8f20214b9b2f4c15d8))
* add products/users count ([f43d8a6](https://github.com/kdaghari/eggnite-frontend/commit/f43d8a6f39307f1acaf3bd57a9e65685e64402c3))
* add reply display ([50854ce](https://github.com/kdaghari/eggnite-frontend/commit/50854ce1bbeed22240f31a7caacca7367ec299f7))
* add reply removal ([4e143e0](https://github.com/kdaghari/eggnite-frontend/commit/4e143e00946a47e0582ab33a63d56d2f330f736c))
* add users view ([c10bd0b](https://github.com/kdaghari/eggnite-frontend/commit/c10bd0b3cebd7dab09ab1f783aea3c1452815f6e))
* adding a comment pushs it to the comments array ([e8ea7fb](https://github.com/kdaghari/eggnite-frontend/commit/e8ea7fba8cc66a0ac850ad621a2dc00c0a496cf1))
* clicking a notification updates the unread count ([dc388ba](https://github.com/kdaghari/eggnite-frontend/commit/dc388ba312453fb9d0577f82b07abbdcb3a65226))
* factor in the number of replies when counting comments ([8e70ac3](https://github.com/kdaghari/eggnite-frontend/commit/8e70ac34b4c8a106132ed38d2e2594a0273f282b))
* fetch comment replies ([f5b1083](https://github.com/kdaghari/eggnite-frontend/commit/f5b10833f7118158a799fcff46fbe189bf39fec1))
* fetch country ([1830d89](https://github.com/kdaghari/eggnite-frontend/commit/1830d89648ebc4cf03826242a517d1ef5b4527eb))
* fetch notifications periodically ([1e9c4de](https://github.com/kdaghari/eggnite-frontend/commit/1e9c4dece76c545a0fe7bb6f000af70e4bd944b5))
* image upload ([cce23d7](https://github.com/kdaghari/eggnite-frontend/commit/cce23d70cb33236722b889ff202db7b23a03a4a9))
* restrict replies to 1-level ([83b5b55](https://github.com/kdaghari/eggnite-frontend/commit/83b5b55384f5bd8bdffdf32a4790898e65ee0555))
* **wip:** add comment reply ([5b170aa](https://github.com/kdaghari/eggnite-frontend/commit/5b170aa181800079dd1159ad2afd19c5852ae1fe))
* remove media before deleting the product ([69226d6](https://github.com/kdaghari/eggnite-frontend/commit/69226d6b93141c46b280e86272a9c1586c9a772c))


### Bug Fixes

* `_vm.product is undefined` was due to the query relying on cache instead of network ([a1f3112](https://github.com/kdaghari/eggnite-frontend/commit/a1f31125ab277292a8a860856f0a394492802ba1))
* add comment/reply to the start of the array ([a254324](https://github.com/kdaghari/eggnite-frontend/commit/a254324c94d6fdaf1ef69d6cf4c461ee671b91eb))
* add missing `company` field ([8cbe970](https://github.com/kdaghari/eggnite-frontend/commit/8cbe97088fb53d8582aba714a25df31e25c24da2))
* add missing `state` param ([374bbdd](https://github.com/kdaghari/eggnite-frontend/commit/374bbddd06d50f07af94220c6bc01c547fcbaadc))
* add missing fields ([cd4b263](https://github.com/kdaghari/eggnite-frontend/commit/cd4b263887cc5417e0f67a4044460291f1c9bca7))
* change fetch policy to avoid any clashing with cache ([33cc436](https://github.com/kdaghari/eggnite-frontend/commit/33cc4361bb6221cd098347f28ff0d6cf9f4adf3e))
* count length/display ([94a6892](https://github.com/kdaghari/eggnite-frontend/commit/94a6892aad28c6879554d0aefd61060041063fcb))
* delete comment proactively ([a9d93b2](https://github.com/kdaghari/eggnite-frontend/commit/a9d93b25a66c171ce0c75c15db4f88f57ab437b0))
* dialog prop should be on the data object as it's use only on the client ([bba2283](https://github.com/kdaghari/eggnite-frontend/commit/bba2283d14c8676d56d0ee9e7f73b5ed97e69456))
* differenciate between comment and reply ([e7126c7](https://github.com/kdaghari/eggnite-frontend/commit/e7126c70812a49441f290040d84c9475b5cffffb))
* display feedback and fetch it only if needed ([130df2d](https://github.com/kdaghari/eggnite-frontend/commit/130df2dea45c0a49446fc47a4efe9100012388ec))
* don't render the whole component if conditions are invalid ([d61b3f5](https://github.com/kdaghari/eggnite-frontend/commit/d61b3f525837b1267a327780bfa7c9150ea38bf9))
* eagrly load logo ([316fd07](https://github.com/kdaghari/eggnite-frontend/commit/316fd070336f382779aeeffe913c0b463841700a))
* feedback is rendered on client only and only if user is not admin and is logged in ([efa2938](https://github.com/kdaghari/eggnite-frontend/commit/efa293876839aa2d7f152e6ca8eca7c9582a9b55))
* fetch user everytime he visits product page to check if he's the owner ([3bfeea1](https://github.com/kdaghari/eggnite-frontend/commit/3bfeea102ffb19098c1ee8c3ef849a5727af1e46))
* initial variables have to be static ([69ced1d](https://github.com/kdaghari/eggnite-frontend/commit/69ced1dba9bd5eac20b062dd4ed411184f95d5fe))
* issue related to product not being rendered ([43d41a0](https://github.com/kdaghari/eggnite-frontend/commit/43d41a05ea9bb542aba32f0100183be35c285658))
* issue related to product not loading at all/in time ([6d98183](https://github.com/kdaghari/eggnite-frontend/commit/6d98183cf943ef1b0b233b24142dac59cb0ae1f5))
* prefetch users list, display list only when it's ready and display default avatar on chip ([1bfe35e](https://github.com/kdaghari/eggnite-frontend/commit/1bfe35ecf7d34147469d5c1144621f719372fc1c))
* prefetching is the default behavior for ssr ([9080949](https://github.com/kdaghari/eggnite-frontend/commit/90809492d2fa0791bca8dc73aba2f65a02459ff3))
* remove product id for reply ([081ebf2](https://github.com/kdaghari/eggnite-frontend/commit/081ebf2757e11f2480f51acf6594531beee0a172))
* remove s3 client and add remove/upload ([f69a038](https://github.com/kdaghari/eggnite-frontend/commit/f69a038665977a402c51eee5dbb2d67d4f79f2dd))
* rename field ([03bac7e](https://github.com/kdaghari/eggnite-frontend/commit/03bac7edafe2d446215fffb79d3c868f71c834c9))
* rename sex to gender ([34a4db4](https://github.com/kdaghari/eggnite-frontend/commit/34a4db49ba4e158340c5dc8b2e7d36449852c39d))
* resize image to 512x512 and accept all images ([d696f9e](https://github.com/kdaghari/eggnite-frontend/commit/d696f9ed1997a7ff960253d815015d5df9c1b3ea))
* return users object ([ad51581](https://github.com/kdaghari/eggnite-frontend/commit/ad51581fa07e64e4e8bb8a1756bf3cb13291cc6b))
* set product it for reply ([ba12a9c](https://github.com/kdaghari/eggnite-frontend/commit/ba12a9cd7374938b70e807cf8cf869e4019e0069))
* skip query if user is not logged in ([d0e7fa4](https://github.com/kdaghari/eggnite-frontend/commit/d0e7fa4181048ed25211e948f7f9141e7fc37865))
* various ([23720bb](https://github.com/kdaghari/eggnite-frontend/commit/23720bb8d658e6a54444c8d2e292cd802e3cd5c2))
* various ([339a2b6](https://github.com/kdaghari/eggnite-frontend/commit/339a2b66f4805bfcb0675b464b3fb65e977a7647))

## [1.4.0](https://github.com/kdaghari/eggnite-frontend/compare/v1.3.0...v1.4.0) (2020-02-12)


### Features

* eagerly load images and remove aspect ratio ([7fedf55](https://github.com/kdaghari/eggnite-frontend/commit/7fedf5517535fa14d015ca066a184d01924f9d9a))


### Bug Fixes

* sometimes get request has problems fetching the ressource in question ([64d3eb1](https://github.com/kdaghari/eggnite-frontend/commit/64d3eb10d641356ca50c2fd3ef2133d3e3ff153b))

## [1.3.0](https://github.com/kdaghari/eggnite-frontend/compare/v1.2.1...v1.3.0) (2020-02-12)


### Features

* eagerliy load avatar and ssr it ([89b23b5](https://github.com/kdaghari/eggnite-frontend/commit/89b23b51a0d55e6cdb65243caa3300e26a1996de))

### [1.2.1](https://github.com/kdaghari/eggnite-frontend/compare/v1.2.0...v1.2.1) (2020-02-12)

## [1.2.0](https://github.com/kdaghari/eggnite-frontend/compare/v1.1.12...v1.2.0) (2020-02-12)


### Features

* prefetch to ensure a snappier feel ([66c6ff1](https://github.com/kdaghari/eggnite-frontend/commit/66c6ff19f39202c646737a0f23798fe32dd4cfb7))

### [1.1.12](https://github.com/kdaghari/eggnite-frontend/compare/v1.1.11...v1.1.12) (2020-02-12)

### [1.1.11](https://github.com/kdaghari/eggnite-frontend/compare/v1.1.10...v1.1.11) (2020-02-12)


### Bug Fixes

* setup correct headers ([e285b8b](https://github.com/kdaghari/eggnite-frontend/commit/e285b8b11302b76794d95658941d3bee3cf2c6f1))

### [1.1.10](https://github.com/kdaghari/eggnite-frontend/compare/v1.1.9...v1.1.10) (2020-02-11)

### [1.1.9](https://github.com/kdaghari/eggnite-frontend/compare/v1.1.8...v1.1.9) (2020-02-11)

### [1.1.8](https://github.com/kdaghari/eggnite-frontend/compare/v1.1.7...v1.1.8) (2020-02-11)

### [1.1.7](https://github.com/kdaghari/eggnite-frontend/compare/v1.1.6...v1.1.7) (2020-02-11)

### [1.1.6](https://github.com/kdaghari/eggnite-frontend/compare/v1.1.5...v1.1.6) (2020-02-11)

### [1.1.5](https://github.com/kdaghari/eggnite-frontend/compare/v1.1.4...v1.1.5) (2020-02-11)


### Bug Fixes

* activate missing functions ([23abb75](https://github.com/kdaghari/eggnite-frontend/commit/23abb7511512f56628558c9194c4e14e9577ed32))
* use computed prop to get user id instead of fetching it ([aabf8da](https://github.com/kdaghari/eggnite-frontend/commit/aabf8dae055df10f9c75821825a41a8abefdce2b))

### [1.1.4](https://github.com/kdaghari/eggnite-frontend/compare/v1.1.3...v1.1.4) (2020-02-11)

### [1.1.3](https://github.com/kdaghari/eggnite-frontend/compare/v1.1.2...v1.1.3) (2020-02-11)


### Bug Fixes

* add missing param (userId) ([7633922](https://github.com/kdaghari/eggnite-frontend/commit/76339221ab554442c12c4f4e9b302eaf31000365))

### [1.1.2](https://github.com/kdaghari/eggnite-frontend/compare/v1.1.1...v1.1.2) (2020-02-11)

### [1.1.1](https://github.com/kdaghari/eggnite-frontend/compare/v1.1.0...v1.1.1) (2020-02-11)

## 1.1.0 (2020-02-11)


### Features

* add “post your product” orange button below items ([cbcc5d2](https://github.com/kdaghari/eggnite-frontend/commit/cbcc5d27aebfe841d678635f515cb1be6495b3b1))
* add account owner guard ([4f5a0f6](https://github.com/kdaghari/eggnite-frontend/commit/4f5a0f60a37bc22148f1b5df198f59113e3ce00d))
* add admin access ([f5efe8e](https://github.com/kdaghari/eggnite-frontend/commit/f5efe8e1a3a6dc403b58b260f0e5c22173863f7a))
* add appropriate image for posting ([08853a4](https://github.com/kdaghari/eggnite-frontend/commit/08853a43cf10ba7574e02fe0e310956d3a4cc831))
* add auth guard ([16f47b2](https://github.com/kdaghari/eggnite-frontend/commit/16f47b2996c13f26df0dc34bae2883f72afcb0e0))
* add auth guards ([e5b0f0a](https://github.com/kdaghari/eggnite-frontend/commit/e5b0f0a49f39b57bd099ed8cbaf89d8817bd4a14))
* add aws s3 integration ([66db726](https://github.com/kdaghari/eggnite-frontend/commit/66db726b5e1ec108ea163af5025b4e6df7e1d290))
* add congrats message for first time poster ([5a89a1b](https://github.com/kdaghari/eggnite-frontend/commit/5a89a1bb5e4477aa475d363f7a4feb9314244bf8))
* add control validation ([8f446df](https://github.com/kdaghari/eggnite-frontend/commit/8f446dfef7e456a434c7e4d75a0efb5e85cb3c45))
* add cozy error messages ([2f0c20e](https://github.com/kdaghari/eggnite-frontend/commit/2f0c20e51bb0c101316c23426cc936ddf488330e))
* add default avatar display ([190360e](https://github.com/kdaghari/eggnite-frontend/commit/190360e68c87a0cf2d04ecce6e9805dfe0d2a6cf))
* add default user avatar ([4ea942e](https://github.com/kdaghari/eggnite-frontend/commit/4ea942ea1c0f265740c867d61a622a565c643338))
* add dynamic social media links addition ([f767e02](https://github.com/kdaghari/eggnite-frontend/commit/f767e02bc9be1525083de91859c4f5a6cac7d041))
* add feddback sending ([24ca58d](https://github.com/kdaghari/eggnite-frontend/commit/24ca58d2c4e4324a2109a05001f5d609b2517b55))
* add feedback sender ([eb1ad47](https://github.com/kdaghari/eggnite-frontend/commit/eb1ad47526132c34c1e9d5f8a0bd3e200026bacb))
* add file upload ([a46a224](https://github.com/kdaghari/eggnite-frontend/commit/a46a224b6a94740fa98e73560104f151127cace5))
* add file upload validation ([0c4511f](https://github.com/kdaghari/eggnite-frontend/commit/0c4511f76d3cb5e48c581b4f58bec3831ddd6135))
* add footer content ([7b697b8](https://github.com/kdaghari/eggnite-frontend/commit/7b697b8beb61647b416e7940b0d2ef65f00d9374))
* add graphql integration ([830af4f](https://github.com/kdaghari/eggnite-frontend/commit/830af4f40af58b4da9d79349ee5e933d37d93207))
* add login dialog open mutation for ease of use ([df07026](https://github.com/kdaghari/eggnite-frontend/commit/df070263cb02f3a7242713ca388216fa88046c02))
* add logo ([bf14659](https://github.com/kdaghari/eggnite-frontend/commit/bf146594e3ec598104af5390b8dc007d53bd890b))
* add product edit page ([ff48e6b](https://github.com/kdaghari/eggnite-frontend/commit/ff48e6b0e360b72ebe4050b397af88a58beeabc5))
* add public page ([fbe2714](https://github.com/kdaghari/eggnite-frontend/commit/fbe27147583b974598d623e1716ec5a24eab872f))
* add welcome message ([47d9616](https://github.com/kdaghari/eggnite-frontend/commit/47d9616848616e3498d358ac5c6631a5b776f1f8))
* control hidden state through store ([62fc3b6](https://github.com/kdaghari/eggnite-frontend/commit/62fc3b62920925f6cf04d8284e5e9c97df9563d7))
* open login dialog for unauthed user ([a146e23](https://github.com/kdaghari/eggnite-frontend/commit/a146e23f99ac7e369764e8ec7f12bec4383d8e8d))
* **auth:** add auth ([3cc5517](https://github.com/kdaghari/eggnite-frontend/commit/3cc5517eb93c36138352e4595d027455f6c0068c))
* **nabvar:** add navbar ([e53630c](https://github.com/kdaghari/eggnite-frontend/commit/e53630c90371449e5fe0a9c8a9c4550d2565b0b1))
* **page:** add edit page ([1b40c85](https://github.com/kdaghari/eggnite-frontend/commit/1b40c85c772f03bbaa25c3a9045eb6cdca840e18))
* **product:** add product page ([cd60231](https://github.com/kdaghari/eggnite-frontend/commit/cd60231115bc4d5c87e8d4c04d7de1b0a285e8d8))
* **product-item-feed:** add product display in feed. ([c53f9cd](https://github.com/kdaghari/eggnite-frontend/commit/c53f9cdac9c85608c8a8025837f9e335cdb9c164))
* **profile:** add comment card ([df1716c](https://github.com/kdaghari/eggnite-frontend/commit/df1716c5440b7259613f3c0ba712d1748e182d0b))
* **profile:** add profile page ([516b081](https://github.com/kdaghari/eggnite-frontend/commit/516b081cbc0d68a7a8bdb8a81e064ba77cb1a20c))
* **profile:** add user profile page ([3822d18](https://github.com/kdaghari/eggnite-frontend/commit/3822d18fd3af6856f5923b306fd19c38aac7652e))
* **wip:** add feedback button ([3eec7db](https://github.com/kdaghari/eggnite-frontend/commit/3eec7dbd1f59e9e06b911f7e6c439f2bbff98a3d))
* **wip:** add feedback button ([55890ce](https://github.com/kdaghari/eggnite-frontend/commit/55890ceac54c050c2f113d782c650596db818dff))
* **wip:** add welcome banner ([e060f3f](https://github.com/kdaghari/eggnite-frontend/commit/e060f3fda605e939a99d400f17298461f48d4c06))
* **wip:** add welcome banner ([1df0295](https://github.com/kdaghari/eggnite-frontend/commit/1df0295f148ad8404ef067c6d9bbdffff9542111))
* add meta tags ([8f9f08e](https://github.com/kdaghari/eggnite-frontend/commit/8f9f08e67d63399ca74afc34b82fc76164f5fbe2))
* add missing control validation ([47a76f3](https://github.com/kdaghari/eggnite-frontend/commit/47a76f3cda14642830f7ee4183cca71f31652e00))
* add product owner guard ([51532aa](https://github.com/kdaghari/eggnite-frontend/commit/51532aa0cac884f4e567c5d4b360e1eca4153b61))
* load uploaded file ([b9054d5](https://github.com/kdaghari/eggnite-frontend/commit/b9054d543a2264e19e3432c51aaea2606b77b0b2))
* **wip:** add welcome message for first time login ([4f5850d](https://github.com/kdaghari/eggnite-frontend/commit/4f5850d21e28259ea02c83a30776012546fa32aa))
* add public pages ([5b454cb](https://github.com/kdaghari/eggnite-frontend/commit/5b454cb6852a7d64ee6fe621eed34a34b6aba72f))
* add sign up page link only on xs ([2b3f2e3](https://github.com/kdaghari/eggnite-frontend/commit/2b3f2e3ffd2bbc96f5fbfdc1cbbe35a01c6f6938))
* add validation ([5bdf137](https://github.com/kdaghari/eggnite-frontend/commit/5bdf13736de615d897a7c9adec5ca805460d1541))
* add validation ([ac8664b](https://github.com/kdaghari/eggnite-frontend/commit/ac8664b8bdd361e348d5127e35046d2dbe3930fc))
* product post/edit form is now functional ([ab03b17](https://github.com/kdaghari/eggnite-frontend/commit/ab03b17f57d61304dfa55ce93baaef9a57cd3241))
* rename 'signup' to 'join' as it's more welcoming ([db340ff](https://github.com/kdaghari/eggnite-frontend/commit/db340ff43022c1c8b64642b7df6ebf7d938e9a87))
* restyle single comment ([bdc106b](https://github.com/kdaghari/eggnite-frontend/commit/bdc106b96e6ef7b85784c09cb6416ede3e42816d))
* **comment:** add message for non-users ([01852fc](https://github.com/kdaghari/eggnite-frontend/commit/01852fc644d2f8d51768b820a225ef46e8768f19))
* **page:** add sign up page ([d8a01b1](https://github.com/kdaghari/eggnite-frontend/commit/d8a01b1bc496d3e5ca0da7608885389c920dd10a))
* **product:** add 'new product' page ([3da4d58](https://github.com/kdaghari/eggnite-frontend/commit/3da4d580228d2f8ed6c90c2b40e29fc97f6cfe2e))
* **profile:** add missing stuff ([5e4fa22](https://github.com/kdaghari/eggnite-frontend/commit/5e4fa22c4d7f5d2625b710a0604202c880d112aa))
* **wip:** add file upload ([3ba8fca](https://github.com/kdaghari/eggnite-frontend/commit/3ba8fca2af85d75bc549b06b9d1b57b18224facd))


### Bug Fixes

* add auth control ([e9e0933](https://github.com/kdaghari/eggnite-frontend/commit/e9e0933e556601445106dda68ec533726e36f9c0))
* add product page ([151d5b1](https://github.com/kdaghari/eggnite-frontend/commit/151d5b1d9535b813cf8a7912cc2630766aa5958d))
* birthdate returns null if not set ([9249bfc](https://github.com/kdaghari/eggnite-frontend/commit/9249bfcd4c4ca67d680a44866bfd80f19ada525a))
* carousel display is now uniform on all platforms ([fbc9661](https://github.com/kdaghari/eggnite-frontend/commit/fbc9661d6f77d7cf42bd34384c6f4649c812e13b))
* check if product exits as the user types the name ([5c69a89](https://github.com/kdaghari/eggnite-frontend/commit/5c69a89e2527ccaa287046b3634e545658558995))
* debounce to avoid in-flight store rest ([3919594](https://github.com/kdaghari/eggnite-frontend/commit/3919594fea0a999e584a17552aaddb5157022ff1))
* deleting a product closes the modal and refreshes the page ([0fd575b](https://github.com/kdaghari/eggnite-frontend/commit/0fd575ba7fe110e4606bda30de4c66b24a7be75b))
* don't run remove mutation if there's only one maker ([b6e08e8](https://github.com/kdaghari/eggnite-frontend/commit/b6e08e858ff7cea83507bd5e4c7f2b6044539e57))
* don't send in from if anything is invalid ([edfb0cc](https://github.com/kdaghari/eggnite-frontend/commit/edfb0cc9e777d2d9a96570f1ada49bf56a97148a))
* don't set inital profile picture ([1637e19](https://github.com/kdaghari/eggnite-frontend/commit/1637e19c6959c02f33ab70c68e4622ce75c3cb92))
* make product url dynamically generated ([010225e](https://github.com/kdaghari/eggnite-frontend/commit/010225e6740abd21da280ffc05d3bfb09f858be6))
* no need for this to be rendered on the client ([d4f4556](https://github.com/kdaghari/eggnite-frontend/commit/d4f4556c3ff44acaf52ed7c203caff45f433997c))
* only send request if fields are valid ([f8fb7e3](https://github.com/kdaghari/eggnite-frontend/commit/f8fb7e382d02250d3812671a0092034c59ae4cad))
* open facebook page in another tab ([8a0700b](https://github.com/kdaghari/eggnite-frontend/commit/8a0700b6d2d8fe71bd4584fc7520626e226f7fb3))
* point to comment section instead of specific comment ([d6c390c](https://github.com/kdaghari/eggnite-frontend/commit/d6c390c853149ba2d778682312ec622156a5d4d7))
* prevent removal of makers on edit only ([454ca92](https://github.com/kdaghari/eggnite-frontend/commit/454ca9290e03d0065958a0c93edd82b0cf67d32b))
* product url should have hyphens for spaces ([309cefc](https://github.com/kdaghari/eggnite-frontend/commit/309cefc65cf3845ab039eed5b38cad1359bf7ff1))
* redirect to / if user is not logged in ([47fdbec](https://github.com/kdaghari/eggnite-frontend/commit/47fdbece800269d338620568460b434062f04012))
* redirect to homepage upon deletion ([9c1e447](https://github.com/kdaghari/eggnite-frontend/commit/9c1e4479e888ff94e12d2ed755459d84468c57ed))
* remove share buttons (for now) ([107031c](https://github.com/kdaghari/eggnite-frontend/commit/107031ccd505ad91acf90856cdda3501d58b4149))
* remove subscriptions support ([03e666c](https://github.com/kdaghari/eggnite-frontend/commit/03e666c027f89c12c0de097b84c127c94a5bf84a))
* remove unused code ([49362d2](https://github.com/kdaghari/eggnite-frontend/commit/49362d2cda9045a2a9433f920bcc0a6235e4fe05))
* remove unused setting ([3417f58](https://github.com/kdaghari/eggnite-frontend/commit/3417f5804ec9b86796943feccad2bc5c87ef040d))
* remove unused vars ([c23fb0d](https://github.com/kdaghari/eggnite-frontend/commit/c23fb0d5f02e4149a1effd18f441fafc53714cae))
* rename props ([4058b80](https://github.com/kdaghari/eggnite-frontend/commit/4058b80754ef5a57d93c92b25b5a3b564a74e3d3))
* setup props correctly ([728fe89](https://github.com/kdaghari/eggnite-frontend/commit/728fe89cc82c9459e7eceb51ae4dd49144e9ba5f))
* stay on same url on login, don't redirect home ([6a42eda](https://github.com/kdaghari/eggnite-frontend/commit/6a42eda0f8c39cc6ef3fbf50dbbbba487bb3d2ba))
* typo ([9d1241e](https://github.com/kdaghari/eggnite-frontend/commit/9d1241e216ac224424a19c9d61b52cdc8e92b975))
* update copyright year ([2b065e8](https://github.com/kdaghari/eggnite-frontend/commit/2b065e8965effd6e24c00a11adda414e280a081a))
* update user data when he posts a product ([eea2a3e](https://github.com/kdaghari/eggnite-frontend/commit/eea2a3e8cd95ec52b82f24f430fc8e990cbc6f40))
* uploader has no ssr support ([460670d](https://github.com/kdaghari/eggnite-frontend/commit/460670dc7cee2f693f59b83afdcebe18d7fc9584))
* use anonymous function in auth guards ([fa8b2ef](https://github.com/kdaghari/eggnite-frontend/commit/fa8b2ef31d73d9604f35da18fabb75f6b537b510))
* use defined computed value directly ([831ba30](https://github.com/kdaghari/eggnite-frontend/commit/831ba30be7f1e4b8a9d48ffb51ab4d12d8dc3f09))
* use page prop ([e43d259](https://github.com/kdaghari/eggnite-frontend/commit/e43d259430d43df5e42ea7e5221a0dec14096e0e))
* **product-feed-item:** adjust overall look ([561f234](https://github.com/kdaghari/eggnite-frontend/commit/561f23442c456b165858796a11aa889b0b3f8249))
* user correct user profile link ([1e5de28](https://github.com/kdaghari/eggnite-frontend/commit/1e5de28e6bf93c232ad1f3b6b2af75dce6722171))
