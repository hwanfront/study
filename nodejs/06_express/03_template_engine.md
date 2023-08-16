# template engine
HTML의 정적인 단점을 개선하기 위해 사용합니다. 반복문, 조건문, 변수 등을 사용해 동적인 페이지를 작성합니다. 
## Pug (Jade)
[pug](https://pugjs.org/)
```js
const app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
```
## nunjucks
[nunjucks](https://mozilla.github.io/nunjucks/templating.html)
```js
const app = express();
app.set('view engine', 'html');

nunjucks.configure('views', {
  express: app,
  watch: true
})
```