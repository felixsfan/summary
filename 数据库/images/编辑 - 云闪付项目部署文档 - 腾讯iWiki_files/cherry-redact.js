let isDev = false;
try {
  if (window.self === window.top) {
    isDev = true;
  }
} catch (e) {
  console.log(e);
}
var cherry;
var cherryEditor = {
  value: '',
  save: '',
  upload: '',
  saveTime: '',
  run(code, save, upload, saveTime) {
    // 设置值
    cherryEditor.value = code;
    cherryEditor.save = save;
    cherryEditor.saveTime = saveTime;
    cherryEditor.upload = upload;
    if (!isDev) {
      cherryEditor.createCherry();
    }
  },
  cherryEvent() {
    // 点击事件
    document.querySelector('#markdown .cherry-previewer').addEventListener('click', function (ev) {
      const target = ev.target || ev.srcElement;
      if (target.nodeName.toLowerCase() == 'a') {
        const href = target.getAttribute('href')
        if (href && href.indexOf('#') !== 0) {
          ev.preventDefault()
          window.open(href)
          return false
        }
      }
    });
  },
  setConfig(obj) {
    const config = obj;
    config.value = cherryEditor.value || ''
    // 上传事件
    config.fileUpload = (file, callback) => {
      cherryEditor.upload(file).then((url) => {
        callback(url);
      });
    }
    // toolbars调整
    config.toolbars = {
      theme: 'light',
      toolbar: ['bold', 'italic', 'strikethrough', '|', 'color', 'header', '|', 'list',
        { insert: ['image', 'audio', 'video', 'link', 'hr', 'br', 'code', 'formula', 'toc', 'table', 'line-table', 'bar-table', 'pdf', 'word'] },
        'graph',
        'togglePreview', 'export',
        'close'
      ],
      customMenu: {
        close: Cherry.createMenuHook('close', {
          iconName: 'close',
          subMenuConfig: [],
          shortcutKeys: [],
          onClick(selection) { // 保存按钮事件
            if (isDev) {
              const code = cherry.getValue();
              console.log(cherry.engine.makeHtml(code))
            } else {
              cherryEditor.value = cherry.getValue();
              cherryEditor.save(cherryEditor.value);
            }
          },
        })
      },
      sidebar: [],
    }
    config.engine.global = {
      urlProcessor: (url) => {
        return cherryAttachment.transform(url);
      },
    }
    // 自定义实时保存
    config.engine.customSyntax.Save = {
      syntaxClass: Cherry.createSyntaxHook('Save', Cherry.constants.HOOKS_TYPE_LIST.PAR, {
        makeHtml(str) {
          if (cherryEditor && cherryEditor.saveTime && cherry) {
            cherryEditor.saveTime(cherry.getValue());
          }
          return str;
        },
      }),
      force: true,
      before: 'br',
    }
    return config;
  },
  createCherry() {
    const CustomHookA = Cherry.createSyntaxHook('codeBlock', Cherry.constants.HOOKS_TYPE_LIST.PAR, {
      makeHtml(str) {
        console.warn('custom hook', 'hello');
        return str;
      },
      rule(str) {
        const regex = {
          begin: '',
          content: '',
          end: ''
        };
        regex.reg = new RegExp(regex.begin + regex.content + regex.end, 'g');
        return regex;
      }
    });
    let config = {
      id: 'markdown',
      externals: {
        echarts: window.echarts,
        katex: window.katex,
        MathJax: window.MathJax,
      },
      engine: {
        global: {
          urlProcessor(url, srcType) {
            console.log(`url-processor`, url, srcType);
            return url;
          }
        },
        syntax: {
          'table': {
            enableChart: true,
            // chartEngine: Engine Class
          },
          fontEmphasis: {
            allowWhitespace: true, // 是否允许首尾空格
          },
          mathBlock: {
            engine: 'MathJax', // katex或MathJax
            src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js', // 如果使用MathJax plugins，则需要使用该url通过script标签引入
          },
          inlineMath: {
            engine: 'MathJax', // katex或MathJax
          },
          emoji: {
            useUnicode: false,
            customResourceURL: 'https://git.woa.com/assets/webpack/images/emoji/${code}.png',
            upperCase: true
          },
          // toc: {
          //     tocStyle: 'nested'
          // }
          // 'header': {
          //   strict: false
          // }
        },
        customSyntax: {
          // SyntaxHookClass
          CustomHook: {
            syntaxClass: CustomHookA,
            force: false,
            after: 'br'
          },
          TapdTablePlugin: {
            syntaxClass: Cherry.plugins.TapdTablePlugin,
            force: true,
            before: 'br',
          },
          TapdHtmlTagPlugin: {
            syntaxClass: Cherry.plugins.TapdHtmlTagPlugin,
            force: true,
            before: 'br',
          },
          TapdCheckListPlugin: {
            syntaxClass: Cherry.plugins.TapdCheckListPlugin,
            force: true,
          },
        }
      },
      toolbars: {
        toolbar: ['bold', 'italic', 'strikethrough', '|', 'color', 'header', '|', 'list',
          { insert: ['image', 'audio', 'video', 'link', 'hr', 'br', 'code', 'formula', 'toc', 'table', 'line-table', 'bar-table', 'pdf', 'word'] },
          'graph',
          'togglePreview', 'settings', 'switchModel', 'codeTheme', 'export'
        ],
        sidebar: ['mobilePreview', 'copy'],
      },
      editor: {
        defaultModel: 'edit&preview',
      },
      previewer: {
        // 自定义markdown预览区域class
        // className: 'markdown'
      },
      keydown: [],
      //extensions: [],  
      value: cherryEditor.value || '',
    }
    config = cherryEditor.setConfig(config); // 自定义配置
    cherry = new Cherry(config);
    cherryEditor.cherryEvent(); // 自定义事件
  }
};
if (isDev) {
  cherryEditor.createCherry();
}
