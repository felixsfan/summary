/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable indent */
/* eslint no-undef: "error" */
(function initMainFormat(window, $) {
    if ($("#full-height-container-mask")[0]) {
        $("#main").css('margin-left', 0);
        $("#full-height-container-mask").remove();
    }
    try {
        const iwikiCommon = {
            userName: '', // 用户名
            fullName: '',  // 带中文用户名
            fromEnv: '',  // 环境
            fromPage: '', // PC、mobile
            language: window.navigator.language.substr(0, 2), // 浏览器语言
            host: window.location.host,
            url: window.location.href,
            baseUrl: `${window.location.protocol}//${window.location.host}`,
            space_key: '',
            content_id: '',
        };
        if ($('meta[name="ajs-page-id"]')[0]) {
            iwikiCommon.content_id = $('meta[name="ajs-page-id"]').attr('content');
        }
        if ($('meta[name="confluence-space-key"]')[0]) {
            iwikiCommon.space_key = $('meta[name="confluence-space-key"]').attr('content');
        }
        if ($('meta[name="ajs-remote-user"]')[0]) {
            iwikiCommon.userName = $('meta[name="ajs-remote-user"]').attr('content');
        }
        if ($('meta[name="ajs-current-user-fullname"]')[0]) {
            iwikiCommon.fullName = $('meta[name="ajs-current-user-fullname"]').attr('content');
        }
        if (iwikiCommon.host.indexOf('.woa') !== -1) {
            iwikiCommon.fromEnv = iwikiCommon.host.split('.woa')[0];
            if (iwikiCommon.fromEnv === 'iwiki') {
                iwikiCommon.fromEnv = 'CF/iWiki';
            } else if (iwikiCommon.fromEnv === 'iwiki-test') {
                iwikiCommon.fromEnv = 'Test';
            } else if (iwikiCommon.fromEnv === 'iwiki-stage') {
                iwikiCommon.fromEnv = 'Stage';
            } else {
                iwikiCommon.fromEnv = 'Dev';
            }
        }
        if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
            iwikiCommon.fromPage = 'Mobile';
        } else {
            iwikiCommon.fromPage = 'PC';
        }
        // SDK初始化(上报)
        let beacon;
        try {
            beacon = new BeaconAction({
                appkey: 'JS0AJX2T3936G2', // 系统或项目id
                onReportSuccess: (e) => {
                    console.log(`onReportSuccess : ${e}`);
                },
                onReportFail: (e) => {
                    console.log(`onReportFail : ${e}`);
                },
            });
        } catch(e){
            beacon = false;
        }
        function iwikiReport(code, obj) {
            if (beacon) {
                console.log('onReportSuccess');
                const data = {
                    user_name: iwikiCommon.userName,
                    event_from: iwikiCommon.fromPage,
                    from: iwikiCommon.fromEnv,
                    version: '',
                };
                for (const key in obj) {
                    data[key] = obj[key];
                }
                beacon.onDirectUserAction(code, data);
            } else {
                console.log("加载灯塔失败...")
            }
        }
        window.MainFormatIWikiReport = iwikiReport;
        // 中英文国际化
        let formatLang;
        if ($('meta[name="ajs-user-locale"]')[0]) {
            window.localStorage.setItem('ajs-user-locale', $('meta[name="ajs-user-locale"]').attr('content'));
            formatLang = $('meta[name="ajs-user-locale"]').attr('content') === 'zh_CN' ? iwikiLang('china') : iwikiLang('eng');
        } else {
            formatLang = iwikiCommon.language === 'zh' ? iwikiLang('china') : iwikiLang('eng');
        }
        function iwikiLang(res) {
            const formatLang = {};
            if (res === 'china') {
                formatLang.profile = '个人主页';
                formatLang.wxwork = '企业微信';
                formatLang.recently = '最近';
                formatLang.isearch = '搜内网';
                formatLang.recentSpace = '最近空间';
                formatLang.recentlyContents = '最近文档';
                formatLang.viewAll = '查看全部';
                formatLang.notView = '暂无浏览记录';
                formatLang.help = '帮助';
                formatLang.wxMessage = '消息通知语言';
                formatLang.createSpace = '创建空间';
                formatLang.dashboard = '工作台';
                formatLang.explore = '发现';
                formatLang.repositories = '知识库';
                formatLang.tencentDocs = '腾讯文档';
                formatLang.relatedDocs = '关联腾讯文档';
                formatLang.onlineDoc = '新建在线文档';
                formatLang.onlineform = '新建在线表格';
                formatLang.onlineSlideshow = '新建在线幻灯片';
                formatLang.onlineCollection = '新建在线收集表';
                formatLang.attachment = '附件';
                formatLang.insertAttachment = '插入"附件"';
                formatLang.attachmentList = '附件列表';
                formatLang.insertAttachmentList = '插入"附件列表"';
                formatLang.attachmentImage = '图片';
                formatLang.insertAttachmentImage = '插入"图片"';
                formatLang.attachmentVideo = '视频';
                formatLang.insertAttachmentVideo = '插入"视频"';
                formatLang.visibleToallpartners = '全部合作伙伴可见，请注意敏感信息保护';
                formatLang.visibleToallpartners2 = '全部腾讯员工可见，请注意敏感信息保护';
                formatLang.visibleToallpartners3 = '全部员工(含合作伙伴)可见，请注意敏感信息保护';
                formatLang.insertFile = '文件和图片';
                formatLang.insertFileTip = '插入"文件和图片" (Ctrl+M)';
                formatLang.insertCode = '代码块';
                formatLang.insertCodeTip = '插入"代码块"';
                formatLang.insertStatus = '状态';
                formatLang.insertStatusTip = '插入"状态"';
                formatLang.insertLine = '水平线';
                formatLang.insertLineTip = '插入"水平线" (----)';
                formatLang.insertDate = '日期';
                formatLang.insertDateTip = '插入"日期" (//)';
                formatLang.insertUser = '用户提及';
                formatLang.insertUserTip = '插入"用户提及"';
                formatLang.insertVideo = '视频';
                formatLang.insertVideoTip = '插入"在线视频"';
                formatLang.insertFileList = '附件列表';
                formatLang.insertFileListTip = '插入"附件列表"';
                formatLang.insertMessage = '信息';
                formatLang.insertMessageTip = '插入"信息"';
                formatLang.insertEmo = '表情符号';
                formatLang.insertEmoTip = '插入"表情符号"';
                formatLang.insertSymbol = '符号';
                formatLang.insertSymbolTip = '插入"符号"';
                formatLang.insertHandy = 'Handy Status';
                formatLang.insertHandyTip = '插入"Handy Status"';
                formatLang.insertShow = '展开';
                formatLang.insertShowTip = '插入"展开"';
                formatLang.insertRoadmap = '甘特图';
                formatLang.insertRoadmapTip = '插入"路线图编辑器"';
                formatLang.insertDraw = 'Draw.io';
                formatLang.insertDrawTip = '插入"Draw.io"';
                formatLang.insertMd = 'Markdown';
                formatLang.insertMdTip = '插入"Markdown"';
                formatLang.insertCherryMd = 'Cherry Markdown';
                formatLang.insertCherryMdTip = '插入"Cherry Markdown"';
                formatLang.insertToc = '目录';
                formatLang.insertTocTip = '插入"目录"';
                formatLang.insertFloatToc = '悬浮目录';
                formatLang.insertFloatTocTip = '插入"悬浮目录"';
                formatLang.insertTreeToc = '子目录树';
                formatLang.insertTreeTocTip = '插入"子目录树" (Page Tree)';
                formatLang.add = '添加';
                formatLang.cancel = '取消';
                formatLang.comAdd = '确认添加';
                formatLang.saveAll = '保存所有';
                formatLang.permissions = '确认权限';
                formatLang.spacetip1 = '建议按部门/组为合作伙伴设置权限';
                formatLang.spacetip2 = '如非必须，请勿添加全部合作伙伴权限';
                formatLang.footerTip = '腾讯 iWiki  |  如有疑问，请咨询：iWiki Helper';
                formatLang.mindMap = '思维导图';
                formatLang.teamRank = '打榜';
                formatLang.information = '信息安全声明';
                formatLang.information1 = '1、iWiki平台的所有内容（包含但不限于：文档、图片、评论、音视频文件等信息）均属于公司资产，仅用于内部学习交流。';
                formatLang.information2_0 = '2、';
                formatLang.information2_1 = '未经授权批量拉取内容、私自外传内容（包含但不限于：复制、拍照、截图、上传页面等操作）属于违规行为。';
                formatLang.information2_2 = '无论当事人是否在职，公司将按照';
                formatLang.information2_3 = '《防止办公网内高危行为管理办法》';
                formatLang.information2_4 = '和';
                formatLang.information2_5 = '《阳光行为准则》';
                formatLang.information2_6 = '对违规行为进行处理，并对情节恶劣者保留追究法律责任的权利。';
                formatLang.information3 = '3、请勿在iWiki平台上明文存储密码、Token、票据、证书、数据库连接字符串等敏感信息，请自行妥善保管。';
                formatLang.information4_0 = '4、iWiki 空间的';
                formatLang.information4_1 = '权限默认是开放的';
                formatLang.information4_2 = '，即公司员工可访问对其开放的信息和内容。如有需要可对权限进行设置，详情点击';
                formatLang.information4_3 = '《iWiki权限说明指引》';
                formatLang.information4_4 = '查看。';
                formatLang.information5 = '我已阅读并承诺遵守以上规定';
                formatLang.information6 = '确定';
                formatLang.subscribe = '订阅';
            } else {
                formatLang.attachment = 'Attachment';
                formatLang.insertAttachment = 'Insert Attachment';
                formatLang.attachmentList = 'Attachment List';
                formatLang.insertAttachmentList = 'Insert Attachment List';
                formatLang.attachmentImage = 'Image';
                formatLang.insertAttachmentImage = 'Insert Image';
                formatLang.attachmentVideo = 'Video';
                formatLang.insertAttachmentVideo = 'Insert Video';
                formatLang.profile = 'Profile';
                formatLang.wxwork = 'Wechat';
                formatLang.recently = 'Recently';
                formatLang.isearch = 'Isearch';
                formatLang.recentSpace = 'Recently spaces';
                formatLang.recentlyContents = 'Recently contents';
                formatLang.viewAll = 'View all recently visited';
                formatLang.notView = 'There is no data to display';
                formatLang.help = 'Help';
                formatLang.wxMessage = 'Notification language';
                formatLang.createSpace = 'Create space';
                formatLang.dashboard = 'Dashboard';
                formatLang.explore = 'Explore';
                formatLang.repositories = 'Repositories';
                formatLang.tencentDocs = 'Tencent Documents';
                formatLang.relatedDocs = 'Link Tencent Docs';
                formatLang.onlineDoc = 'New online document';
                formatLang.onlineform = 'New online form';
                formatLang.onlineSlideshow = 'New online slideshow';
                formatLang.onlineCollection = 'New online collection form';
                formatLang.visibleToallpartners = 'Visible to all partners, please protect sensitive information';
                formatLang.visibleToallpartners2 = 'Visible to all Tencent employees, please protect sensitive information';
                formatLang.visibleToallpartners3 = 'Visible to all employees (including partners), please protect sensitive information';
                formatLang.insertFile = 'Files and images';
                formatLang.insertFileTip = 'Insert Files And Images (Ctrl+M)';
                formatLang.insertCode = 'Code';
                formatLang.insertCodeTip = 'Insert Code';
                formatLang.insertStatus = 'Status';
                formatLang.insertStatusTip = 'Insert Status';
                formatLang.insertLine = 'Horizontal Rule';
                formatLang.insertLineTip = 'Insert Horizontal Rule (----)';
                formatLang.insertDate = 'Date';
                formatLang.insertDateTip = 'Insert Date (/ then /)';
                formatLang.insertUser = 'User Mention';
                formatLang.insertUserTip = 'Insert User Mention';
                formatLang.insertVideo = 'Video';
                formatLang.insertVideoTip = 'Insert Video';
                formatLang.insertFileList = 'File List';
                formatLang.insertFileListTip = 'Insert File List';
                formatLang.insertMessage = 'Info';
                formatLang.insertMessageTip = 'Insert Info';
                formatLang.insertEmo = 'Emoticon';
                formatLang.insertEmoTip = 'Insert Emoticon';
                formatLang.insertSymbol = 'Symbol';
                formatLang.insertSymbolTip = 'Insert Symbol';
                formatLang.insertHandy = 'Handy Status';
                formatLang.insertHandyTip = 'Insert Handy Status';
                formatLang.insertShow = 'Expand';
                formatLang.insertShowTip = 'Insert Expand';
                formatLang.insertRoadmap = 'Roadmap';
                formatLang.insertRoadmapTip = 'Insert Roadmap';
                formatLang.insertDraw = 'Draw.io';
                formatLang.insertDrawTip = 'Insert Draw.io';
                formatLang.insertMd = 'Markdown';
                formatLang.insertMdTip = 'Insert Markdown';
                formatLang.insertCherryMd = 'Cherry Markdown';
                formatLang.insertCherryMdTip = 'Insert Cherry Markdown';
                formatLang.insertToc = 'Toc';
                formatLang.insertTocTip = 'Insert Toc';
                formatLang.insertFloatToc = 'Float Toc';
                formatLang.insertFloatTocTip = 'Insert Float Toc';
                formatLang.insertTreeToc = 'Page Tree';
                formatLang.insertTreeTocTip = 'Insert Page Tree';
                formatLang.add = 'Add';
                formatLang.cancel = 'Cancel';
                formatLang.comAdd = 'Add';
                formatLang.saveAll = 'Save All';
                formatLang.permissions = 'Confirm permissions';
                formatLang.spacetip1 = 'It is recommended to set permissions for partners by department / group';
                formatLang.spacetip2 = 'If not necessary, please do not add all partner permissions';
                formatLang.footerTip = 'If you have any questions, please contact: iWiki Helper';
                formatLang.mindMap = 'Mind map';
                formatLang.teamRank = 'Ranking';
                formatLang.information = 'Information Security Statement';
                formatLang.information1 = '1. All content of the iWiki platform (including but not limited to: documents, pictures, comments, audio and video files, etc.) are company assets which are only used for internal learning and communication.';
                formatLang.information2_0 = '2. ';
                formatLang.information2_1 = 'Unauthorized batch pull of content, private transfer of content (including but not limited to: copying, taking pictures, screenshots, uploading pages, etc.) are violations. ';
                formatLang.information2_2 = 'Regardless of whether the parties are in employment or not, the company will deal with violations in accordance with the';
                formatLang.information2_3 = '"Administrative Measures for the Prevention of High Risk Behaviors in the Office Network"';
                formatLang.information2_4 = ' and the ';
                formatLang.information2_5 = '"Sunshine Code of Conduct"';
                formatLang.information2_6 = ', and reserves the right to pursue legal liabilities for those with bad circumstances.';
                formatLang.information3 = '3. Do not store sensitive information such as passwords, tokens, tickets, certificates, and database connection strings in clear text on the iWiki platform. Please keep it properly by yourself.';
                formatLang.information4_0 = '4. The permissions of the iWiki space are open ';
                formatLang.information4_1 = 'by default';
                formatLang.information4_2 = ', that is, company employees can access the information and content open to it. If necessary, you can set permissions. For details, click ';
                formatLang.information4_3 = '"iWiki Permission Description Guidelines"';
                formatLang.information4_4 = ' to view.';
                formatLang.information5 = 'I have read and undertake to abide by the above regulations';
                formatLang.information6 = 'Confirm';
                formatLang.subscribe = 'Subscribe';
            }
            return formatLang;
        }
        if ($('#footer #poweredby')[0]) {
            $('#footer #poweredby .noprint').text(formatLang.footerTip);
        }
        // 隐藏编辑权限中的匿名权限模块
        if ($('#uPermissionsTable')[0]) {
            $('#uPermissionsTable').next()
                .nextAll()
                .hide();
            $('.primary-button-container').show();
        }
        // 新增即时通讯按钮
        if ($('#userparam-im')[0]) {
            $('#userparam-im').html('<img src=\'/tencent/static/images/wxwork-logo-blue.png\'><span style="margin-left:2px">企业微信</span>')
                .click(() => {
                    window.open(`wxwork://message?username=${($('#email').text()
                        .split('@')[0])}`);
                })
                .mouseenter(function () {
                    $(this).find('img')
                        .attr({ src: '/tencent/static/images/wxwork-logo-white.png' });
                })
                .mouseleave(function () {
                    $(this).find('img')
                        .attr({ src: '/tencent/static/images/wxwork-logo-blue.png' });
                });
        }
        // 新增消息通知语言设置
        if ($('form[name=editsettingsform]')[0]) {
            $('form[name=editsettingsform]>fieldset>div').eq(2)
                .before(`<div class="group">
                    <legend><span style="white-space:nowrap;">${formatLang.wxMessage}</span></legend>
                    <div class="wxMessageCheck">
                        <input type="checkbox" name="notify-language" id="wxMessageChinese" value="cn">
                        <label for="wxMessageChinese">中文</label>
                        <input type="checkbox" name="notify-language" id="wxMessageEnglish" value="en">
                        <label for="wxMessageEnglish">English</label>
                    </div>
                </div>`);
            const wxMessageLanguage = window.localStorage.getItem('wxMessageLanguage');
            if (wxMessageLanguage) {
                if (wxMessageLanguage === 'cn') {
                    $('#wxMessageChinese').prop('checked', true);
                } else {
                    $('#wxMessageEnglish').prop('checked', true);
                }
            } else {
                const xhr = new XMLHttpRequest();
                xhr.open('get', `${iwikiCommon.baseUrl}/rest/iwiki/1.0/config/user/notify-language`);
                xhr.send();
                xhr.onload = function () {
                    const res = JSON.parse(xhr.responseText).config;
                    if (res) {
                        window.localStorage.setItem('wxMessageLanguage', res);
                        if (res === 'cn') {
                            $('#wxMessageChinese').prop('checked', true);
                        } else {
                            $('#wxMessageEnglish').prop('checked', true);
                        }
                    } else {
                        window.localStorage.setItem('wxMessageLanguage', 'cn');
                        $('#wxMessageChinese').prop('checked', true);
                    }
                };
            }
            $('.wxMessageCheck :checkbox').click(function () {
                $(this).attr('checked', true);
                $(this).siblings(':checkbox')
                    .removeAttr('checked');
            });
            if ($('#edit')[0]) {
                $('#wxMessageChinese').prop('disabled', true);
                $('#wxMessageEnglish').prop('disabled', true);
                $('.wxMessageCheck').children()
                    .css('cursor', 'not-allowed');
            }
            if ($('#confirm')[0]) {
                $('.wxMessageCheck>label').css('color', '#000');
                $('#confirm').click(() => {
                    $('.wxMessageCheck input').each((index, ele) => {
                        if ($(ele).attr('checked')) {
                            const xhr = new XMLHttpRequest();
                            xhr.open('POST', `${iwikiCommon.baseUrl}/rest/iwiki/1.0/config/user`);
                            xhr.setRequestHeader('Content-type', 'application/json');
                            xhr.send(`{'config': {'notify-language':${($(ele).val())}},'atl_token': AJS.Confluence.getXsrfToken()}`);
                            xhr.onload = function () {
                                window.localStorage.setItem('wxMessageLanguage', $(ele).val());
                            };
                        }
                    });
                });
            }
            $('form[name=editsettingsform]>fieldset>div').eq(0).remove();
        }
        // 新增创建空间按钮
        if ($('#space-directory-wrapper')[0]) {
            if ($('#navigation .ajs-menu-bar')[0]) {
                $('#navigation #addSpaceLink').parent()
                    .remove();
            }
            if (!$('#navigation #wiki-create-space2')[0]) {
                $('#navigation>ul').append(`<li class="ajs-button normal"><a id="iwiki-create-space2" href="/tencent/static/new/#/createspace" title="${formatLang.createSpace}">${formatLang.createSpace}</a></li>`);
                $('#iwiki-create-space2').click(() => {
                    iwikiReport('click_create_space');
                });
            }
        }
        // 新增个人信息提示弹窗
        if ($('#main')[0]) {
            let showUserTipId = null;
            let hideUserTipId = null;
            $('body').append($(`
                <div id='content-hover-userinfo'>
                    <div style='display:flex;align-items:center;margin:0 27px 0 19px' class='username'>
                        <img style='width:56px;border-radius:28px;margin-right:23px' src='/images/icons/profilepics/default.svg'></img>
                        <div>
                            <p style='margin-bottom:14px;font-weight:600;font-size:15px'></p>
                            <span></span>
                        </div>
                    </div>
                    <div class='userRank' style='margin:8px 24px;word-break:break-word;height:48px;align-items:center;overflow:hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;cursor:pointer'></div>
                    <div style='display:flex;justify-content:space-between;margin:0 24px'>
                        <div class='hover-userparam-home'><img width='18px' height='16px' src=/tencent/static/images/icon_home_blue.png><span style='margin:0 auto;width:75px;text-align:center;'>${formatLang.profile}</span></div>
                        <div class='hover-userparam-im'><img width='18px' height='16px' src=/tencent/static/images/wxwork-logo-blue2.png><span style='margin:0 auto;width:75px;text-align:center;'>${formatLang.wxwork}</span></div>
                    </div>
                </div
            `));
            $('#main a.confluence-userlink').each((index, item) => {
                if ($(item).children("img")[0]) {
                    $(item).css({ width: $(item).children("img").width(), height: $(item).children("img").height() });
                }
                $(item).append($('<i class=\'userlink-mark\' style=\'position:absolute;top:0;left:0;width:100%;height:100%\'></i>'));
            })
            $('#main a.userLogoLink').each((index, item) => {
                if ($(item).children("img")[0]) {
                    $(item).css({ width: $(item).children("img").width(), height: $(item).children("img").height() });
                }
                $(item).append($('<i class=\'userlink-mark\' style=\'position:absolute;top:0;left:0;width:100%;height:100%\'></i>'));
            })
            $('.userlink-mark').mousemove((e) => {
                e.stopPropagation();  // 阻止同名事件冒泡
                return false;
            });
            $('body').on('mouseenter', '.userlink-mark', function () {
                showUserTipId = setTimeout(() => {
                    let userinfo;
                    const $this = this;
                    const username = $(this).parent()
                        .attr('data-username');
                    const clientWidth = $($this).offset().top - $(document).scrollTop();
                    const clientHeight = $(window).height() - $($this).height() - clientWidth;
                    const xhr = new XMLHttpRequest();
                    xhr.open('get', `${iwikiCommon.baseUrl}/rest/mobile/latest/profile/${username}`);
                    xhr.send();
                    xhr.onload = function () {
                        userinfo = JSON.parse(xhr.responseText);
                        $('#content-hover-userinfo .username img').attr({ src: userinfo.avatarUrl, alt: userinfo.userName });
                        $('#content-hover-userinfo .username p').text(userinfo.fullName);
                        $('#content-hover-userinfo .username span').text(userinfo.position);
                        $('#content-hover-userinfo .userRank').text(userinfo.department);
                        AJS.$('#content-hover-userinfo .userRank').tooltip({
                            gravity: 'w',
                            title() {
                                return userinfo.department;
                            },
                        });
                        const width = $($this).width() / 2;
                        const height = $($this).height() / 2;
                        if (clientHeight < 172) {
                            $('#content-hover-userinfo').css({
                                left: $($this).offset().left + width,
                                top: $($this).offset().top - $('#content-hover-userinfo').height() - $($this).height() - 20,
                            })
                                .stop(false, true)
                                .show();
                        } else {
                            $('#content-hover-userinfo').css({
                                left: $($this).offset().left + width,
                                top: $($this).offset().top + height + 15,
                            })
                                .stop(false, true)
                                .show();
                        }
                        $('.hover-userparam-home img').attr('alt', userinfo.userName);
                        $('.hover-userparam-im img').attr('alt', userinfo.userName);
                        $('.hover-userparam-home').mouseenter(function () {
                            $(this).find('img')
                                .attr({ src: '/tencent/static/images/icon_home_white.png' });
                        })
                            .mouseleave(function () {
                                $(this).find('img')
                                    .attr({ src: '/tencent/static/images/icon_home_blue.png' });
                            })
                            .click(function () {
                                window.open(`${iwikiCommon.baseUrl}/display/~${$(this).find('img')
                                    .attr('alt')}`);
                            });
                        $('.hover-userparam-im').mouseenter(function () {
                            $(this).find('img')
                                .attr({ src: '/tencent/static/images/wxwork-logo-white.png' });
                        })
                            .mouseleave(function () {
                                $(this).find('img')
                                    .attr({ src: '/tencent/static/images/wxwork-logo-blue2.png' });
                            })
                            .click(function () {
                                window.open(`wxwork://message?username=${$(this).find('img')
                                    .attr('alt')}`);
                            });
                    };
                }, 500);
            });
            $('body').on('mouseleave', '.userlink-mark', () => {
                clearTimeout(showUserTipId);
                if ($('#content-hover-userinfo').is(':hidden')) {
                    clearTimeout(showUserTipId);
                } else {
                    hideUserTipId = setTimeout(() => {
                        $('#content-hover-userinfo').stop(false, true)
                            .hide();
                    }, 200);
                    $('#content-hover-userinfo').mouseenter(() => {
                        clearTimeout(hideUserTipId);
                    })
                        .mouseleave(function () {
                            $(this).stop(false, true)
                                .hide();
                        });
                }
            });
        }
        // 页面水印
        if ($('#content')[0] && !$("#content").hasClass("edit")) {
            const content = document.getElementById('content');
            const can = document.createElement('canvas');
            const divElem = document.createElement('div');
            divElem.setAttribute('id', 'iwiki-user-water');
            can.width = 280;
            can.height = 240;
            can.style.display = 'block';
            can.style.fillStyle = '#F8F8F8';
            const cans = can.getContext('2d');
            const val = -22 * Math.PI;
            cans.rotate(val / 180);
            cans.font = '26px Helvetica Neue Microsoft JhengHei';
            cans.fillStyle = 'rgba(196,196,196,0.15)';
            cans.textAlign = 'left';
            cans.textBaseline = 'Middle';
            const width = can.width / 3;
            const height = can.height / 2;
            cans.fillText(iwikiCommon.userName, width - 40, height, 200);
            divElem.style.backgroundImage = `url(${can.toDataURL('image/png')})`;
            content.appendChild(divElem);
        }
        // 腾讯文档上报事件
        if ($('.main-txdoc-preview')[0]) {
            $('.main-txdoc-preview .preview-footer').each((i, e) => {
                let typefrom;
                if ($(e).hasClass("related")) {
                    typefrom = 'related docs';
                } else if ($(e).hasClass("doc")) {
                    typefrom = 'doc';
                } else if ($(e).hasClass("sheet")) {
                    typefrom = 'sheet';
                } else if ($(e).hasClass("slide")) {
                    typefrom = 'slide';
                } else if ($(e).hasClass("form")) {
                    typefrom = 'form edit';
                }
                iwikiReport('show_docs_macro', { type_from: typefrom, show_from: 'view' });
            });
            $('.main-txdoc-preview').click(function () {
                if (!$(this).children(".preview-header")[0]) {
                    let typefrom;
                    let openForm = "other browsers";
                    if ($(this).children(".preview-footer").hasClass("related")) {
                        typefrom = 'related docs';
                    } else if ($(this).children(".preview-footer").hasClass("doc")) {
                        typefrom = 'doc';
                    } else if ($(this).children(".preview-footer").hasClass("sheet")) {
                        typefrom = 'sheet';
                    } else if ($(this).children(".preview-footer").hasClass("slide")) {
                        typefrom = 'slide';
                    } else if ($(this).children(".preview-footer").hasClass("form")) {
                        typefrom = 'form edit';
                    }
                    if ($(this).find(".viewtip").attr("title") == "无权限查看" || $(this).find(".viewtip").attr("title") == "No permission to view") {
                        openForm = "no access";
                    }
                    iwikiReport('click_card_open_docs', { type_from: typefrom, open_from: openForm });
                }
            });
            // 关联文档
            $('.main-txdoc-preview .preview-footer.related .tencent-doc-title').click(() => {
                iwikiReport('click_left_title_macro', { type_from: 'related docs' });
            });
            $('.main-txdoc-preview .preview-footer.related .open-url').click(() => {
                iwikiReport('click_docs_open_macro', { type_from: 'related docs', open_from: 'view' });
            });
            $('.main-txdoc-preview .preview-footer.related .toggle-editor').click(function () {
                if ($(this).hasClass('editor')) {
                    iwikiReport('click_toggle_read_macro', { type_from: 'related docs' });
                } else {
                    iwikiReport('click_toggle_editing_macro', { type_from: 'related docs' });
                }
            });
            $('.main-txdoc-preview .preview-footer.related .toggle-maximize').click(function () {
                if ($(this).hasClass('maximize')) {
                    iwikiReport('click_exit_max_macro', { type_from: 'related docs' });
                } else {
                    iwikiReport('click_max_macro', { type_from: 'related docs' });
                }
            });
            // 在线文档
            $('.main-txdoc-preview .preview-footer.doc .tencent-doc-title').click(() => {
                iwikiReport('click_left_title_macro', { type_from: 'doc' });
            });
            $('.main-txdoc-preview .preview-footer.doc .open-url').click(() => {
                iwikiReport('click_docs_open_macro', { type_from: 'doc', open_from: 'view' });
            });
            $('.main-txdoc-preview .preview-footer.doc .toggle-editor').click(function () {
                if ($(this).hasClass('editor')) {
                    iwikiReport('click_toggle_read_macro', { type_from: 'doc' });
                } else {
                    iwikiReport('click_toggle_editing_macro', { type_from: 'doc' });
                }
            });
            $('.main-txdoc-preview .preview-footer.doc .toggle-maximize').click(function () {
                if ($(this).hasClass('maximize')) {
                    iwikiReport('click_exit_max_macro', { type_from: 'doc' });
                } else {
                    iwikiReport('click_max_macro', { type_from: 'doc' });
                }
            });
            // 在线表格
            $('.main-txdoc-preview .preview-footer.sheet .tencent-doc-title').click(() => {
                iwikiReport('click_left_title_macro', { type_from: 'sheet' });
            });
            $('.main-txdoc-preview .preview-footer.sheet .open-url').click(() => {
                iwikiReport('click_docs_open_macro', { type_from: 'sheet', open_from: 'view' });
            });
            $('.main-txdoc-preview .preview-footer.sheet .toggle-editor').click(function () {
                if ($(this).hasClass('editor')) {
                    iwikiReport('click_toggle_read_macro', { type_from: 'sheet' });
                } else {
                    iwikiReport('click_toggle_editing_macro', { type_from: 'sheet' });
                }
            });
            $('.main-txdoc-preview .preview-footer.sheet .toggle-maximize').click(function () {
                if ($(this).hasClass('maximize')) {
                    iwikiReport('click_exit_max_macro', { type_from: 'sheet' });
                } else {
                    iwikiReport('click_max_macro', { type_from: 'sheet' });
                }
            });
            // 在线幻灯片
            $('.main-txdoc-preview .preview-footer.slide .tencent-doc-title').click(() => {
                iwikiReport('click_left_title_macro', { type_from: 'slide' });
            });
            $('.main-txdoc-preview .preview-footer.slide .open-url').click(() => {
                iwikiReport('click_docs_open_macro', { type_from: 'slide', open_from: 'view' });
            });
            $('.main-txdoc-preview .preview-footer.slide .toggle-editor').click(function () {
                if ($(this).hasClass('editor')) {
                    iwikiReport('click_toggle_read_macro', { type_from: 'slide' });
                } else {
                    iwikiReport('click_toggle_editing_macro', { type_from: 'slide' });
                }
            });
            $('.main-txdoc-preview .preview-footer.slide .toggle-maximize').click(function () {
                if ($(this).hasClass('maximize')) {
                    iwikiReport('click_exit_max_macro', { type_from: 'slide' });
                } else {
                    iwikiReport('click_max_macro', { type_from: 'slide' });
                }
            });
            // 在线收集表
            $('.main-txdoc-preview .preview-footer.form .tencent-doc-title').click(() => {
                iwikiReport('click_left_title_macro', { type_from: 'form edit' });
            });
            $('.main-txdoc-preview .preview-footer.form .open-url').click(() => {
                iwikiReport('click_docs_open_macro', { type_from: 'form edit', open_from: 'view' });
            });
            $('.main-txdoc-preview .preview-footer.form .toggle-editor').click(function () {
                if ($(this).hasClass('editor')) {
                    iwikiReport('click_toggle_read_macro', { type_from: 'form edit' });
                } else {
                    iwikiReport('click_toggle_editing_macro', { type_from: 'form edit' });
                }
            });
            $('.main-txdoc-preview .preview-footer.form .toggle-maximize').click(function () {
                if ($(this).hasClass('maximize')) {
                    iwikiReport('click_exit_max_macro', { type_from: 'form edit' });
                } else {
                    iwikiReport('click_max_macro', { type_from: 'form edit' });
                }
            });
        }
        // 工具栏排列优化
        if ($('#editPageLink')[0]) {
            $('#editPageLink').append($('<i class=\'editPageLink-mark\' style=\'position:absolute;top:0;left:0;width:100%;height:100%\'></i>'));
            $('.editPageLink-mark').click((e) => {
                e.stopPropagation();
                location.href = iwikiCommon.url + $('#editPageLink').attr('href');
            });
        }
        if ($('#editpageform')[0] || $('#createpageform')[0]) {
            macroSort();
            macroFileList();
            macroCherry();
            macroTencentDocs();
            macroMindmap();
            function macroSort() {
                $('#insert-menu-options .grouped-dropdown-item').eq(0)
                    .hide();
                $('#insert-menu-options').prepend(`
                    <div class="grouped-dropdown-item">
                      <ul id="macroSort">
                          <li style="display: none" class="dropdown-item content-image" data-tooltip='${formatLang.insertAttachment}' original-title>
                          <a id="dropdown-attachment" class="item-link" href="#">
                              <span class="icon" style="background:url('/tencent/static/images/icon_attachment.svg') no-repeat center;background-size:160%"></span>
                              ${formatLang.attachment}
                          </a>
                          </li>
                          <li class="dropdown-item content-image" data-tooltip='${formatLang.insertAttachmentList}' original-title>
                          <a id="dropdown-attachment-list" class="item-link" href="#">
                              <span class="icon" style="background:url('/tencent/static/images/icon_file_list.svg') no-repeat center;background-size:110%"></span>
                              ${formatLang.attachmentList}
                          </a>
                          </li>
                          <li style="display: none" class="dropdown-item content-image" data-tooltip='${formatLang.insertAttachmentImage}' original-title>
                          <a id="dropdown-attachment-image" class="item-link" href="#">
                              <span class="icon" style="background:url('/tencent/static/images/icon_image.svg') no-repeat center;background-size:110%"></span>
                              ${formatLang.attachmentImage}
                          </a>
                          </li>
                          <li class="dropdown-item content-image" data-tooltip='${formatLang.insertAttachmentVideo}' original-title>
                          <a id="dropdown-attachment-video" class="item-link" href="#">
                              <span class="icon" style="background:url('/tencent/static/images/icon_video.svg') no-repeat center;background-size:110%"></span>
                              ${formatLang.attachmentVideo}
                          </a>
                          </li>
                          <li class="dropdown-item content-image" data-command="mceConfimage" data-tooltip='${formatLang.insertFileTip}'
                          original-title>
                          <a id="rte-insert-image" class="item-link" href="#">
                              <span class="icon aui-icon aui-icon-small aui-iconfont-image "></span>
                              ${formatLang.insertFile}
                          </a>
                          </li>
                          <li class="dropdown-item macro-code" data-macro-name="code" data-tooltip='${formatLang.insertCodeTip}' original-title>
                          <a id="code" class="item-link" href="#">
                              <span class="icon aui-icon aui-icon-small aui-iconfont-repository-small"></span>
                              ${formatLang.insertCode}
                          </a>
                          </li>
                          <li class="dropdown-item macro-status" data-macro-name="status" data-tooltip='${formatLang.insertStatusTip}' original-title>
                          <a id="status" class="item-link" href="#">
                              <span class="icon confluence-icon-status-macro"></span>
                              ${formatLang.insertStatus}
                          </a>
                          </li>
                          <li class="dropdown-item content-hr" data-command="InsertHorizontalRule" data-tooltip='${formatLang.insertLineTip}'
                          original-title>
                          <a id="rte-insert-hr" class="item-link" href="#">
                              <span class="icon aui-icon aui-icon-small aui-iconfont-horizontal-rule"></span>
                              ${formatLang.insertLine}
                          </a>
                          </li>
                          <li class="dropdown-item content-date" data-command="confMenuInsertDate" data-tooltip='${formatLang.insertDateTip}'
                          original-title>
                          <a id="rte-insert-date" class="item-link" href="#">
                              <span class="icon aui-icon aui-icon-small aui-iconfont-calendar "></span>
                              ${formatLang.insertDate}
                          </a>
                          </li>
                          <li class="dropdown-item macro-insertmention-button" data-macro-name="insertmention-button" data-tooltip='${formatLang.insertUserTip}'
                          original-title>
                          <a id="insertmention-button" class="item-link" href="#">
                              <span class="icon aui-icon aui-icon-small aui-iconfont-mention "></span>
                              ${formatLang.insertUser}
                          </a>
                          </li>
                          <li style="display: none" class="dropdown-item macro-multimedia" data-macro-name="multimedia" data-tooltip='${formatLang.insertVideoTip}'
                          original-title>
                          <a id="multimedia" class="item-link" href="#">
                              <span class="icon aui-icon aui-icon-small aui-iconfont-video-filled"></span>
                              ${formatLang.insertVideo}
                          </a>
                          </li>
                          <li style="display: none;" class="dropdown-item macro-attachments" data-macro-name="attachments" data-tooltip='${formatLang.insertFileListTip}' original-title>
                          <a id="attachments" class="item-link" href="#">
                              <span class="icon aui-icon aui-icon-small aui-iconfont-attachment"></span>
                              ${formatLang.insertFileList}
                          </a>
                          </li>
                          <li class="dropdown-item macro-info" data-macro-name="info" data-tooltip='${formatLang.insertMessageTip}'>
                          <a id="info" class="item-link" href="#">
                              <span class="icon aui-icon aui-icon-small aui-iconfont-info-filled "></span>
                              ${formatLang.insertMessage}
                          </a>
                          </li>
                          <li class="dropdown-item content-emoticon active" data-command="mceEmotion" data-tooltip='${formatLang.insertEmoTip}' original-title="">
                          <a id="rte-insert-emoticon" class="item-link" href="#">
                              <span class="icon aui-icon aui-icon-small aui-iconfont-emoji "></span>
                              ${formatLang.insertEmo}
                          </a>
                          </li>
                          <li class="dropdown-item content-symbol" data-command="confCharmap" data-tooltip='${formatLang.insertSymbolTip}' original-title="">
                          <a id="rte-insert-symbol" class="item-link" href="#">
                              <span class="icon aui-icon aui-icon-small aui-iconfont-symbol "></span>
                              ${formatLang.insertSymbol}
                          </a>
                          </li>
                          <li class="dropdown-item macro-status-handy" data-macro-name="status-handy" data-tooltip='${formatLang.insertHandyTip}'
                          original-title>
                          <a id="status-handy" class="item-link" href="#">
                              <span class="icon "></span>
                              ${formatLang.insertHandy}
                          </a>
                          </li>
                          <li class="dropdown-item macro-expand" data-macro-name="expand" data-tooltip='${formatLang.insertShowTip}' original-title>
                          <a id="expand" class="item-link" href="#">
                              <span class="icon aui-icon aui-icon-small aui-iconfont-chevron-double-down"></span>
                              ${formatLang.insertShow}
                          </a>
                          </li>
                          <li class="dropdown-item macro-roadmap" data-macro-name="roadmap" data-tooltip='${formatLang.insertRoadmapTip}' original-title>
                          <a id="roadmap" class="item-link" href="#">
                              <span class="icon" style="background:url('/download/resources/com.atlassian.confluence.plugins.confluence-roadmap-plugin/images/roadmap.png') 0% 0% / cover no-repeat transparent;"></span>
                              ${formatLang.insertRoadmap}
                          </a>
                          </li>
                          <li class="dropdown-item macro-drawio" data-macro-name="drawio" data-tooltip='${formatLang.insertDrawTip}' original-title>
                          <a id="drawio" class="item-link" href="#">
                              <span class="icon "></span>
                              ${formatLang.insertDraw}
                          </a>
                          </li>
                          <li class="dropdown-item macro-cherry" data-macro-name="cherry" data-tooltip='${formatLang.insertCherryMdTip}' original-title>
                          <a id="cherry" class="item-link" href="#">
                              <span class="icon"></span>
                              ${formatLang.insertCherryMd}
                          </a>
                          </li>
                          <li class="dropdown-item macro-toc" data-macro-name="toc" data-tooltip='${formatLang.insertTocTip}'>
                          <a id="toc" class="item-link" href="#">
                              <span class="icon aui-icon aui-icon-small aui-iconfont-overview "></span>
                              ${formatLang.insertToc}
                          </a>
                          </li>
                          <li class="dropdown-item macro-float_toc" data-macro-name="float_toc" data-tooltip='${formatLang.insertFloatTocTip}' original-title>
                          <a id="float_toc" class="item-link" href="#">
                              <span class="icon aui-icon aui-icon-small aui-iconfont-queues"></span>
                              ${formatLang.insertFloatToc}
                          </a>
                          </li>
                          <li class="dropdown-item macro-pagetree" data-macro-name="pagetree" data-tooltip='${formatLang.insertTreeTocTip}'
                          original-title>
                          <a id="pagetree" class="item-link" href="#">
                              <span class="icon aui-icon aui-icon-small aui-iconfont-editor-macro-toc"></span>
                              ${formatLang.insertTreeToc}
                          </a>
                          </li>
                        </ul>
                    </div>
                `);
            }
            function macroTencentDocs() {
                let tencentDocsButton = true;
                $('ul.rte-toolbar-group-insert').before(`
                    <ul class="aui-buttons iwiki-tencent-docs no-separator" id="tencent-docs-box">
                        <li class="toolbar-item toolbar-dropdown tencent-docs-content" id="insert-menu">
                            <div class="aui-dd-parent dd-allocated"  id="iwiki-tencent-docs-insert">
                                <a href="javascript:void(0)" class="toolbar-trigger aui-dd-trigger aui-button aui-button-subtle tencent-docs-button"
                                   style="margin:0 -6px" data-tooltip="${formatLang.tencentDocs}">
                                    <span class="icon" style="background:url('/tencent/static/images/tencent_docs.png') no-repeat center;background-size:100%"></span>
                                    <span class="icon aui-icon aui-icon-small aui-iconfont-dropdown"></span>
                                </a>
                                <div id="insert-tencent-docs" class="aui-dropdown grouped aui-dropdown-left hidden" style="top: 26px;">
                                    <div class="grouped-dropdown-item">
                                        <ul id="content-insert-list">
                                            <li class="dropdown-item macro-related-docs" data-macro-name="related-docs">
                                                <a id="related-docs" class="item-link" href="#">
                                                    <span class="icon"></span>${formatLang.relatedDocs}
                                                </a>
                                            </li>
                                            <li class="dropdown-item macro-online-doc" data-macro-name="online-doc">
                                                <a id="online-doc" class="item-link" href="#">
                                                    <span class="icon"></span>${formatLang.onlineDoc}
                                                </a>
                                            </li>
                                            <li class="dropdown-item macro-online-form" data-macro-name="online-form">
                                                <a id="online-form" class="item-link" href="#">
                                                    <span class="icon"></span>${formatLang.onlineform}
                                                </a>
                                            </li>
                                            <li class="dropdown-item macro-online-slideshow" data-macro-name="online-slideshow">
                                                <a id="online-slideshow" class="item-link" href="#">
                                                    <span class="icon"></span>${formatLang.onlineSlideshow}
                                                </a>
                                            </li>
                                            <li class="dropdown-item macro-online-collection-form" data-macro-name="online-collection-form">
                                                <a id="online-collection-form" class="item-link" href="#">
                                                    <span class="icon"></span>${formatLang.onlineCollection}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                `);
                $('#page').click(() => {
                    hiddenTencentButton();
                });
                $('#rte-button-insert').click(() => {
                    hiddenTencentButton();
                });
                $('#format-dropdown-display').click(() => {
                    hiddenTencentButton();
                });
                $('#iwiki-tencent-docs-insert>a').click((e) => {
                    e.stopPropagation();
                    $(document).click();
                    if (!($('.tencent-docs-content').hasClass('disabled'))) {
                        $('#insert-tencent-docs').toggleClass('hidden');
                        $('#iwiki-tencent-docs-insert').toggleClass('active');
                    }
                    if (tencentDocsButton) {
                        tencentDocsButton = false;
                        $('#wysiwygTextarea_ifr').contents()
                            .find('#tinymce')
                            .click(() => {
                                hiddenTencentButton();
                            });
                    }
                    if (!$('#insert-tencent-docs').hasClass('hidden')) {
                        setTimeout(() => {
                            $('body>.tipsy.tipsy-n').hide();
                        }, 500);
                    }
                });
                function hiddenTencentButton() {
                    $('#insert-tencent-docs').addClass('hidden');
                    $('#iwiki-tencent-docs-insert').removeClass('active');
                }
            }
            function macroFileList() {
                const insertItem = $('li[data-macro-name="ieditor"]').hide();

                let tencentDocsButton = true;

                $('ul.rte-toolbar-group-insert').before(`
                    <ul class="aui-buttons iwiki-attachement no-separator" id="iwiki-attachement-box">
                        <li class="toolbar-item toolbar-dropdown iwiki-attachement-content" id="insert-menu">
                            <div id="iwiki-attachment-insert" class="aui-dd-parent dd-allocated">
                                <a href="javascript:void(0)" class="toolbar-trigger aui-dd-trigger aui-button aui-button-subtle tencent-docs-button"
                                   style="margin:0 -6px" data-tooltip="${formatLang.attachment}">
                                    <span class="icon" style="background:url('/tencent/static/images/icon_attachment.svg') no-repeat center;background-size:160%"></span>
                                    <span class="icon aui-icon aui-icon-small aui-iconfont-dropdown"></span>
                                </a>
                                <div id="insert-iwiki-attachment" class="aui-dropdown grouped aui-dropdown-left hidden" style="top: 26px;">
                                    <div class="grouped-dropdown-item">
                                        <ul id="content-insert-list">
                                            <li class="dropdown-item macro-ieditor">
                                                <a id="iwiki-file-list-insert" class="item-link" href="javascript:void(0)">
                                                    ${formatLang.attachmentList}
                                                </a>
                                            </li>
                                            <li class="dropdown-item macro-ieditor">
                                                <a id="iwiki-file-insert" class="item-link" href="javascript:void(0)">
                                                    ${formatLang.attachment}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                `);

                window.__attachment_context__ = {
                    lastClick: "",
                    files: [],
                };

                const inputAll = document.createElement("input");

                inputAll.type = "file";
                inputAll.multiple = true;

                inputAll.addEventListener("change", (event) => {
                    window.__attachment_context__.files = Array.from(inputAll.files);

                    inputAll.value = "";

                    insertItem.click();
                });

                $("#iwiki-file-list-insert").click(() => {
                    window.__attachment_context__.lastClick = "file_list";

                    insertItem.click();
                })
                $("#iwiki-file-insert").click(() => {
                    window.__attachment_context__.lastClick = "file";

                    inputAll.click();
                })
                $("a#dropdown-attachment-list").click(() => {
                    window.__attachment_context__.lastClick = "file_list";

                    insertItem.click();
                })
                $("a#dropdown-attachment").click(() => {
                    window.__attachment_context__.lastClick = "file";

                    inputAll.click();
                })

                const inputType = document.createElement("input");

                inputType.type = "file";
                inputType.multiple = true;

                inputType.addEventListener("change", (event) => {
                    window.__attachment_context__.files = Array.from(inputType.files);

                    inputType.value = "";

                    insertItem.click();
                });

                $("a#dropdown-attachment-image").click(() => {
                    window.__attachment_context__.lastClick = "image";

                    inputType.accept = "image/*";
                    inputType.click();
                })
                $("a#dropdown-attachment-video").click(() => {
                    window.__attachment_context__.lastClick = "video";

                    inputType.accept = "video/*"
                    inputType.click();
                })
                $('#page').click(() => {
                    hiddenTencentButton();
                });
                $('#rte-button-insert').click(() => {
                    hiddenTencentButton();
                });
                $('#format-dropdown-display').click(() => {
                    hiddenTencentButton();
                });
                $('#iwiki-attachment-insert>a').click((e) => {
                    e.stopPropagation();
                    $(document).click();
                    if (!($('.iwiki-attachement-content').hasClass('disabled'))) {
                        $('#insert-iwiki-attachment').toggleClass('hidden');
                        $('#iwiki-attachment-insert').toggleClass('active');
                    }
                    if (tencentDocsButton) {
                        tencentDocsButton = false;
                        $('#wysiwygTextarea_ifr').contents()
                            .find('#tinymce')
                            .click(() => {
                                hiddenTencentButton();
                            });
                    }
                    if (!$('#insert-iwiki-attachment').hasClass('hidden')) {
                        setTimeout(() => {
                            $('body>.tipsy.tipsy-n').hide();
                        }, 500);
                    }
                });
                function hiddenTencentButton() {
                    $('#insert-iwiki-attachment').addClass('hidden');
                    $('#iwiki-attachment-insert').removeClass('active');
                }
            }
            // 思维导图宏
            function macroMindmap() {
                const insertItem = $('li[data-macro-name="mindmap"]').hide();
                let isInit = false;
                init();
                AJS.bind('init.rte', () => {
                    const { $ } = AJS;
                    init();
                    editMindmap($);
                });
                function init() {
                    if (isInit) {
                        return;
                    }
                    if (insertItem.length) {
                        isInit = true;
                        const insertButton = $(`<ul class="aui-buttons no-separator">
                      <li class="toolbar-item toolbar-dropdown">
                        <a href="javascript:void(0)" class="aui-button aui-button-subtle" data-tooltip="${formatLang.mindMap}" style="margin:0 -6px" original-title="">
                          <span class="icon mindmap-icon"></span>
                        </a>
                      </li>
                    </ul>`);
                        insertButton.on('click', () => {
                            insertItem.click();
                        });
                        $('ul.rte-toolbar-group-insert').before(insertButton);
                    }
                }
                function editMindmap($) {  // 思维导图快捷进入编辑
                    if (window.localStorage.getItem("mindmapToEditor")) {
                        const maidMapValue = JSON.parse(window.localStorage.getItem("mindmapToEditor"));
                        window.localStorage.removeItem("mindmapToEditor");
                        setTimeout(() => {
                            let index = -1;
                            $('#wysiwygTextarea_ifr').contents().find(`img[data-macro-name="mindmap"]`).each((i, e) => {
                                const parameters = $(e).attr("data-macro-parameters");
                                if (parameters.split("|").includes(`imgId=${maidMapValue.imgId}`)) {
                                    index++;
                                    if (index === maidMapValue.index) {
                                        $(e).click();
                                        setTimeout(() => {
                                            if ($("#property-panel .macro-property-panel-mind-edit")[0]) {
                                                $("#property-panel .macro-property-panel-mind-edit").click();
                                            }
                                        }, 500);
                                    }
                                }
                            });
                        }, 1000);
                    }
                }
            }
            // cherry宏
            function macroCherry() {
                const insertItem = $('li[data-macro-name="cherry"]');
                if (insertItem.length) {
                    const insertButton = $(`
                        <ul id="iwiki-cherry-insert" class="aui-buttons no-separator">
                            <li class="toolbar-item toolbar-dropdown">
                                <a href="javascript:void(0)" class="aui-button" data-tooltip="Cherry Markdown" style="margin:0 -6px;padding: 0 6px" original-title="">
                                <span class="icon" style="background:url('/download/resources/com.oa.iwiki.cherry:page/images/favicon.ico') no-repeat center;background-size:100%"></span>
                                </a>
                            </li>
                        </ul>
                    `);
                    insertButton.on('click', function () {
                        if ($(this).children('li')
                            .hasClass('disabled')) {
                            return false;
                        }
                        insertItem.eq(0).click();
                    });
                    $('ul.rte-toolbar-group-insert').before(insertButton);
                }
            }
            // 腾讯文档上报事件2
            setTimeout(() => {
                $('#wysiwygTextarea_ifr').contents()
                    .on('click', '.editor-inline-macro', function () {
                        if ($(this).attr('data-macro-name') === 'related-docs') {
                            $('body').off('mousedown', '#property-panel .first');
                            $('body').on('mousedown', '#property-panel .first', (e) => {
                                if (e.button === 0) {
                                    iwikiReport('click_edit_tencent_docs', { type_from: 'related docs', edit_from: 'macro' });
                                }
                            });
                            $('body').off('mousedown', '#property-panel .macro-property-panel-tencent-docs-height')
                                .on('mousedown', '#property-panel .macro-property-panel-tencent-docs-height', (e) => {
                                    if (e.button === 0) {
                                        iwikiReport('click_height_from', { type_from: 'related docs', show_height_from: 'macro' });
                                        iwikiReport('show_height_from', { type_from: 'related docs', show_height_from: 'macro' });
                                    }
                                });
                        } else if ($(this).attr('data-macro-name') === 'online-doc') {
                            $('body').off('mousedown', '#property-panel .first');
                            $('body').on('mousedown', '#property-panel .first', (e) => {
                                if (e.button === 0) {
                                    iwikiReport('click_edit_tencent_docs', { type_from: 'doc', edit_from: 'macro' });
                                    iwikiReport('show_docs_macro', { type_from: 'doc', show_from: 'edit' });
                                }
                            });
                            $('body').off('mousedown', '#property-panel .macro-property-panel-tencent-docs-height')
                                .on('mousedown', '#property-panel .macro-property-panel-tencent-docs-height', (e) => {
                                    if (e.button === 0) {
                                        iwikiReport('click_height_from', { type_from: 'doc', show_height_from: 'macro' });
                                        iwikiReport('show_height_from', { type_from: 'doc', show_height_from: 'macro' });
                                    }
                                });
                        } else if ($(this).attr('data-macro-name') === 'online-form') {
                            $('body').off('mousedown', '#property-panel .first');
                            $('body').on('mousedown', '#property-panel .first', (e) => {
                                if (e.button === 0) {
                                    iwikiReport('click_edit_tencent_docs', { type_from: 'sheet', edit_from: 'macro' });
                                    iwikiReport('show_docs_macro', { type_from: 'sheet', show_from: 'edit' });
                                }
                            });
                            $('body').off('mousedown', '#property-panel .macro-property-panel-tencent-docs-height')
                                .on('mousedown', '#property-panel .macro-property-panel-tencent-docs-height', (e) => {
                                    if (e.button === 0) {
                                        iwikiReport('click_height_from', { type_from: 'sheet', show_height_from: 'macro' });
                                        iwikiReport('show_height_from', { type_from: 'sheet', show_height_from: 'macro' });
                                    }
                                });
                        } else if ($(this).attr('data-macro-name') === 'online-slideshow') {
                            $('body').off('mousedown', '#property-panel .first');
                            $('body').on('mousedown', '#property-panel .first', (e) => {
                                if (e.button === 0) {
                                    iwikiReport('click_edit_tencent_docs', { type_from: 'slide', edit_from: 'macro' });
                                    iwikiReport('show_docs_macro', { type_from: 'slide', show_from: 'edit' });
                                }
                            });
                            $('body').off('mousedown', '#property-panel .macro-property-panel-tencent-docs-height')
                                .on('mousedown', '#property-panel .macro-property-panel-tencent-docs-height', (e) => {
                                    if (e.button === 0) {
                                        iwikiReport('click_height_from', { type_from: 'slide', show_height_from: 'macro' });
                                        iwikiReport('show_height_from', { type_from: 'slide', show_height_from: 'macro' });
                                    }
                                });
                        } else if ($(this).attr('data-macro-name') === 'online-collection-form') {
                            $('body').off('mousedown', '#property-panel .first');
                            $('body').on('mousedown', '#property-panel .first', (e) => {
                                if (e.button === 0) {
                                    iwikiReport('click_edit_tencent_docs', { type_from: 'form edit', edit_from: 'macro' });
                                    iwikiReport('show_docs_macro', { type_from: 'form edit', show_from: 'edit' });
                                }
                            });
                            $('body').off('mousedown', '#property-panel .macro-property-panel-tencent-docs-height')
                                .on('mousedown', '#property-panel .macro-property-panel-tencent-docs-height', (e) => {
                                    if (e.button === 0) {
                                        iwikiReport('click_height_from', { type_from: 'form edit', show_height_from: 'macro' });
                                        iwikiReport('show_height_from', { type_from: 'form edit', show_height_from: 'macro' });
                                    }
                                });
                        }
                    });
                $('#wysiwygTextarea_ifr').contents()
                    .on('dblclick', '.editor-inline-macro', function () {
                        if ($(this).attr('data-macro-name') === 'related-docs') {
                            iwikiReport('click_edit_tencent_docs', { type_from: 'related docs', edit_from: 'floatwindow' });
                        } else if ($(this).attr('data-macro-name') === 'online-doc') {
                            iwikiReport('click_edit_tencent_docs', { type_from: 'doc', edit_from: 'floatwindow' });
                            iwikiReport('show_docs_macro', { type_from: 'doc', show_from: 'edit' });
                        } else if ($(this).attr('data-macro-name') === 'online-form') {
                            iwikiReport('click_edit_tencent_docs', { type_from: 'sheet', edit_from: 'floatwindow' });
                            iwikiReport('show_docs_macro', { type_from: 'sheet', show_from: 'edit' });
                        } else if ($(this).attr('data-macro-name') === 'online-slideshow') {
                            iwikiReport('click_edit_tencent_docs', { type_from: 'slide', edit_from: 'floatwindow' });
                            iwikiReport('show_docs_macro', { type_from: 'slide', show_from: 'edit' });
                        } else if ($(this).attr('data-macro-name') === 'online-collection-form') {
                            iwikiReport('click_edit_tencent_docs', { type_from: 'form edit', edit_from: 'floatwindow' });
                            iwikiReport('show_docs_macro', { type_from: 'form edit', show_from: 'edit' });
                        }
                    });
            }, 3000);
            // 插入宏
            // 关联文档
            $('#insert-tencent-docs a#related-docs').click(() => {
                iwikiReport('click_related_docs', { entrance_from: 'menu' });
            });
            $('body').on('click', '#reporting-macro-related-docs', () => {
                iwikiReport('click_related_docs', { entrance_from: 'more' });
            });
            $('body').on('mousedown', '.autocomplete-macro-related-docs', (e) => {
                if (e.button === 0) {
                    iwikiReport('click_related_docs', { entrance_from: 'shortcut' });
                }
            });
            // 在线文档
            $('#insert-tencent-docs a#online-doc').click(() => {
                iwikiReport('click_new_doc', { entrance_from: 'menu' });
                iwikiReport('show_docs_macro', { type_from: 'doc', show_from: 'edit' });
            });
            $('body').on('click', '#reporting-macro-online-doc', () => {
                iwikiReport('click_new_doc', { entrance_from: 'more' });
                iwikiReport('show_docs_macro', { type_from: 'doc', show_from: 'edit' });
            });
            $('body').on('mousedown', '.autocomplete-macro-online-doc', (e) => {
                if (e.button === 0) {
                    iwikiReport('click_new_doc', { entrance_from: 'shortcut' });
                }
            });
            // 在线表格
            $('#insert-tencent-docs a#online-form').click(() => {
                iwikiReport('click_new_sheet', { entrance_from: 'menu' });
                iwikiReport('show_docs_macro', { type_from: 'sheet', show_from: 'edit' });
            });
            $('body').on('click', '#reporting-macro-online-form', () => {
                iwikiReport('click_new_sheet', { entrance_from: 'more' });
                iwikiReport('show_docs_macro', { type_from: 'sheet', show_from: 'edit' });
            });
            $('body').on('mousedown', '.autocomplete-macro-online-form', (e) => {
                if (e.button === 0) {
                    iwikiReport('click_new_sheet', { entrance_from: 'shortcut' });
                }
            });
            // 在线幻灯片
            $('#insert-tencent-docs a#online-slideshow').click(() => {
                iwikiReport('click_new_slide', { entrance_from: 'menu' });
                iwikiReport('show_docs_macro', { type_from: 'slide', show_from: 'edit' });
            });
            $('body').on('click', '#reporting-macro-online-slideshow', () => {
                iwikiReport('click_new_slide', { entrance_from: 'more' });
                iwikiReport('show_docs_macro', { type_from: 'slide', show_from: 'edit' });
            });
            $('body').on('mousedown', '.autocomplete-macro-online-slideshow', (e) => {
                if (e.button === 0) {
                    iwikiReport('click_new_slide', { entrance_from: 'shortcut' });
                }
            });
            // 在线收集表
            $('#insert-tencent-docs a#online-collection-form').click(() => {
                iwikiReport('click_new_form_edit', { entrance_from: 'menu' });
                iwikiReport('show_docs_macro', { type_from: 'form edit', show_from: 'edit' });
            });
            $('body').on('click', '#reporting-macro-online-collection-form', () => {
                iwikiReport('click_new_form_edit', { entrance_from: 'more' });
                iwikiReport('show_docs_macro', { type_from: 'form edit', show_from: 'edit' });
            });
            $('body').on('mousedown', '.autocomplete-macro-online-collection-form', (e) => {
                if (e.button === 0) {
                    iwikiReport('click_new_form_edit', { entrance_from: 'shortcut' });
                }
            });
            // 编辑态
            // 在线文档
            $('body').on('click', '#tencent-docs-newOnline.doc .open-url', () => {
                iwikiReport('click_docs_open_macro', { type_from: 'doc', open_from: 'edit' });
            });
            $('body').on('click', '#tencent-docs-newOnline.doc .exit', () => {
                iwikiReport('click_exit_editing_macroedit', { type_from: 'doc' });
            });
            $('body').on('click', '#tencent-docs-newOnline.doc .show-height', () => {
                iwikiReport('click_height_from', { type_from: 'doc', show_height_from: 'docs' });
                iwikiReport('show_height_from', { type_from: 'doc', show_height_from: 'docs' });
            });
            // 在线表格
            $('body').on('click', '#tencent-docs-newOnline.sheet .open-url', () => {
                iwikiReport('click_docs_open_macro', { type_from: 'sheet', open_from: 'edit' });
            });
            $('body').on('click', '#tencent-docs-newOnline.sheet .exit', () => {
                iwikiReport('click_exit_editing_macroedit', { type_from: 'sheet' });
            });
            $('body').on('click', '#tencent-docs-newOnline.sheet .show-height', () => {
                iwikiReport('click_height_from', { type_from: 'sheet', show_height_from: 'docs' });
                iwikiReport('show_height_from', { type_from: 'sheet', show_height_from: 'docs' });
            });
            // 在线幻灯片
            $('body').on('click', '#tencent-docs-newOnline.slide .open-url', () => {
                iwikiReport('click_docs_open_macro', { type_from: 'slide', open_from: 'edit' });
            });
            $('body').on('click', '#tencent-docs-newOnline.slide .exit', () => {
                iwikiReport('click_exit_editing_macroedit', { type_from: 'slide' });
            });
            $('body').on('click', '#tencent-docs-newOnline.slide .show-height', () => {
                iwikiReport('click_height_from', { type_from: 'slide', show_height_from: 'docs' });
                iwikiReport('show_height_from', { type_from: 'slide', show_height_from: 'docs' });
            });
            // 在线收集表
            $('body').on('click', '#tencent-docs-newOnline.form .open-url', () => {
                iwikiReport('click_docs_open_macro', { type_from: 'form edit', open_from: 'edit' });
            });
            $('body').on('click', '#tencent-docs-newOnline.form .exit', () => {
                iwikiReport('click_exit_editing_macroedit', { type_from: 'form' });
            });
            $('body').on('click', '#tencent-docs-newOnline.form .show-height', () => {
                iwikiReport('click_height_from', { type_from: 'form edit', show_height_from: 'docs' });
                iwikiReport('show_height_from', { type_from: 'form edit', show_height_from: 'docs' });
            });
            // 展示高度确认上报
            function clickConfirmHeightDocs(obj, form1, form2) {
                const $setHeight = $(obj).parent().parent().siblings('.setHeight');
                const selectTypeVal = $setHeight.find(".selectType input:checked").val();
                const selectHeightVal = $setHeight.find(".selectHeight .input").val();
                const inputHeightVal = $setHeight.find(".inputHeight .input").val();
                let displayType = "Adaptive";
                let displayHeight = "Adaptive";
                if (selectTypeVal === "auto") {
                    displayType = "Adaptive";
                    iwikiReport('click_confirm_height_docs', {
                        type_from: form1, show_height_from: form2,
                        display_type: displayType, display_height: displayHeight
                    });
                } else {
                    displayType = "Fixed";
                    if (selectHeightVal !== "auto") {
                        displayHeight = selectHeightVal;
                        iwikiReport('click_confirm_height_docs', {
                            type_from: form1, show_height_from: form2,
                            display_type: displayType, display_height: displayHeight
                        });
                    } else {
                        if (inputHeightVal < 1200 && inputHeightVal > 600) {
                            displayHeight = inputHeightVal;
                            iwikiReport('click_confirm_height_docs', {
                                type_from: form1, show_height_from: form2,
                                display_type: displayType, display_height: displayHeight
                            });
                        }
                    }
                }
            }
            $('body').on('mousedown', '#tencent-docs-height-dialog[type="related-docs"] #docs-dialog-submit-button', function (e) {
                if (e.button === 0) {
                    clickConfirmHeightDocs(this, 'related docs', 'macro');
                }
            });
            // 在线文档
            $('body').on('mousedown', '#tencent-docs-height-dialog[type="online-doc"] #docs-dialog-submit-button', function (e) {
                if (e.button === 0) {
                    clickConfirmHeightDocs(this, 'doc', 'macro');
                }
            });
            $('body').on('mousedown', '#tencent-docs-height-dialog[type="doc"] #docs-dialog-submit-button', function (e) {
                if (e.button === 0) {
                    clickConfirmHeightDocs(this, 'doc', 'docs');
                }
            });
            // 在线表格
            $('body').on('mousedown', '#tencent-docs-height-dialog[type="online-form"] #docs-dialog-submit-button', function (e) {
                if (e.button === 0) {
                    clickConfirmHeightDocs(this, 'sheet', 'macro');
                }
            });
            $('body').on('mousedown', '#tencent-docs-height-dialog[type="sheet"] #docs-dialog-submit-button', function (e) {
                if (e.button === 0) {
                    clickConfirmHeightDocs(this, 'sheet', 'docs');
                }
            });
            // 在线幻灯片
            $('body').on('mousedown', '#tencent-docs-height-dialog[type="online-slideshow"] #docs-dialog-submit-button', function (e) {
                if (e.button === 0) {
                    clickConfirmHeightDocs(this, 'slide', 'macro');
                }
            });
            $('body').on('mousedown', '#tencent-docs-height-dialog[type="slide"] #docs-dialog-submit-button', function (e) {
                if (e.button === 0) {
                    clickConfirmHeightDocs(this, 'slide', 'macro');
                }
            });
            // 在线收集表
            $('body').on('mousedown', '#tencent-docs-height-dialog[type="online-collection-form"] #docs-dialog-submit-button', function (e) {
                if (e.button === 0) {
                    clickConfirmHeightDocs(this, 'form edit', 'macro');
                }
            });
            $('body').on('mousedown', '#tencent-docs-height-dialog[type="form"] #docs-dialog-submit-button', function (e) {
                if (e.button === 0) {
                    clickConfirmHeightDocs(this, 'form edit', 'macro');
                }
            });
        }
        // 创建页面
        if ($('#createpageform')[0]) {
            if ($('button#rte-button-cancel')[0]) {
                // 取消事件
                $('button#rte-button-cancel').click(() => {
                    window.history.back();
                });
            }
        }
        // 空间，文档上报
        const pageBeacon = ['/pages/viewpage.action?pageId=', '/display/', '/spaces/viewspace.action?key=', '/collector/pages.action?key='];
        const pageBeaconUrl = pageBeacon.map(ele => iwikiCommon.host + ele);
        const pageBeaconFlag = pageBeaconUrl.some(item => iwikiCommon.url.indexOf(item) !== -1);
        if (pageBeaconFlag) {
            if (iwikiCommon.space_key) {
                const spaceUrlArr = [`/spaces/viewspace.action?key=${iwikiCommon.space_key}`, `/collector/pages.action?key=${iwikiCommon.space_key}`, `/display/${iwikiCommon.space_key}`];
                const spaceUrl = spaceUrlArr.some(item => iwikiCommon.url.split(iwikiCommon.host)[1] === item);
                if (spaceUrl) {
                    iwikiReport('show_space', { space_key: iwikiCommon.space_key });
                    iwikiReport('show_content', { content_id: iwikiCommon.content_id, space_key: iwikiCommon.space_key });
                } else {
                    if (iwikiCommon.content_id) {
                        iwikiReport('show_content', { content_id: iwikiCommon.content_id, space_key: iwikiCommon.space_key });
                    }
                }
            } else {
                const unspaceUrlArr = ['/spaces/viewspace.action?key=', '/collector/pages.action?key=', '/display/'];
                unspaceUrlArr.forEach((item) => {
                    if (iwikiCommon.url.split(item)[1] !== '' && iwikiCommon.url.split(item)[1]) {
                        iwikiCommon.space_key = iwikiCommon.url.split(item)[1];
                    }
                });
                if ($('.access-error>h2')[0]) {
                    if ($('.access-error>h2').text() === '没有权限' || $('.access-error>h2').text() === 'Not Permitted') {
                        iwikiReport('show_space_unauthorized', { space_key: iwikiCommon.space_key });
                    }
                } else if ($('.request-access>h3')[0]) {
                    if ($('.request-access>h3').text() === '您没有查看此页面的权限' || $('.request-access>h3').text() === 'You don\'t have permission to view this page') {
                        iwikiReport('show_space_unauthorized', { space_key: iwikiCommon.space_key });
                    }
                } else if ($('#title-text')[0].innerText === '页面未找到' || $('#title-text')[0].innerText === 'Page Not Found') {
                    if (iwikiCommon.url.split('pageId=')[1]) {
                        iwikiCommon.content_id = iwikiCommon.url.split('pageId=')[1];
                        iwikiReport('show_content_unauthorized', { content_id: iwikiCommon.content_id });
                    }
                }
            }
        }
        // 嵌入空间编辑和概览页面
        if ($('form#d')[0]) {
            $('#space-tools-body').css({ 'padding-left': '8px', 'padding-top': '0px' });
            $('#space-tools-body').siblings('br').remove();
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', '/tencent/static/new/#/overview');
            iframe.setAttribute('width', '100%');
            iframe.setAttribute('height', '750px');
            iframe.setAttribute('frameborder', '0');
            iframe.style.position = 'relative';
            iframe.style.backgroundColor = '#fff';
            iframe.style.zIndex = '199';
            $('#space-tools-body').html(iframe);
            const mask = document.createElement('div');
            mask.setAttribute('id', 'mask');
            document.body.insertBefore(mask, document.body.firstElementChild);
            $('#mask').css({ position: 'fixed', left: '0px', top: ' 0px', background: '#000000', opacity: '0.4', width: '100%', height: ' 100%', 'z-index': '199', display: 'none' });
        }
        // 空间权限tip
        if ($('#space-tools-body .primary-button-container>input[name="save"]')[0]) {
            const addbutton = $('#space-tools-body input[name="groupsToAddButton"]');
            const savebutton = $('#space-tools-body input[name="save"]');
            addbutton.hide().after(`<input type="button" id="iwiki-add" value="${formatLang.add}" class="add button">`);
            savebutton.hide().after(`<input type="button" id="iwiki-save"  value="${formatLang.saveAll}" class="aui-button aui-button-primary">`);
            $('#iwiki-add').click((e) => {
                e.stopPropagation();
                openDialog(addbutton);
            });
            $('#iwiki-save').click((e) => {
                e.stopPropagation();
                openDialog(savebutton);
            });
            function openDialog(button) {
                if ($('#space-tools-body input[name=\'groupsToAdd\']').val() === '全部员工(腾讯合作伙伴)') {
                    if (!$('#permissions-dialog')[0]) {
                        $(document.body).append(`
                            <section id="permissions-dialog" class="aui-dialog2 aui-dialog2-small aui-layer" role="dialog" aria-hidden="true">
                                <header class="aui-dialog2-header"><h2 class="aui-dialog2-header-main">${formatLang.permissions}</h2></header>
                                <div class="aui-dialog2-content"><p>${formatLang.spacetip1}</p><p>${formatLang.spacetip2}</p></div>
                                <footer class="aui-dialog2-footer">
                                    <div class="aui-dialog2-footer-actions">
                                        <button id="dialog-cancel-button" class="aui-button">${formatLang.cancel}</button>
                                        <button id="dialog-submit-button" class="aui-button aui-button-primary">${formatLang.comAdd}</button>
                                    </div>
                                </footer>
                            </section>
                        `);
                        $('#dialog-submit-button').click((e) => {
                            e.preventDefault();
                            AJS.dialog2('#permissions-dialog').hide();
                            button.click();
                        });
                        $('#dialog-cancel-button').click((e) => {
                            e.preventDefault();
                            AJS.dialog2('#permissions-dialog').hide();
                        });
                    }
                    AJS.dialog2('#permissions-dialog').show();
                } else {
                    button.click();
                }
            }
        }
        // 全部合作伙伴权限提示
        if ($('meta[name="ajs-page-id"]')[0] && $('#content-metadata-page-restrictions')[0]) {
            const pageId = $('meta[name="ajs-page-id"]').attr('content');
            function getisEpibolyAll(id) {
                return new Promise((resolve) => {
                    $.ajax({
                        url: `${iwikiCommon.baseUrl}/rest/new-api/permission/isEpibolyAll/${id}`,
                        type: 'get',
                        dataType: 'json',
                        success: data => resolve(data),
                    });
                });
            }
            function getisEpibolyAllUpload(id, obj1, obj2) {
                let timeId = null;
                let endTimeId = null;
                timeId = setInterval(() => {
                    if ($(obj1)[0]) {
                        clearInterval(timeId);
                        clearTimeout(endTimeId);
                        $(obj1).click(() => {
                            let timeId = null;
                            let endTimeId = null;
                            timeId = setInterval(() => {
                                if (!$(obj2)[0]) {
                                    clearInterval(timeId);
                                    clearTimeout(endTimeId);
                                    getisEpibolyAll(id).then((data) => {
                                        if (data.result) {
                                            if (data.result.isEpibolyVisible || data.result.isTencentVisible) {
                                                if (!$('#documentPermissions')[0]) {
                                                    $('#content-metadata-page-restrictions').after('<span id="documentPermissions" style="font-size:14px;color:#ff6600;padding:0 10px 0 5px;"></span>')
                                                        .parent()
                                                        .css({ display: 'flex', alignItems: 'center' });
                                                }
                                                const permission = data.result;
                                                if (permission.isEpibolyVisible && !permission.isTencentVisible) {
                                                    $('#documentPermissions').text(formatLang.visibleToallpartners);
                                                } else if (!permission.isEpibolyVisible && permission.isTencentVisible) {
                                                    $('#documentPermissions').text(formatLang.visibleToallpartners2);
                                                } else if (permission.isEpibolyVisible && permission.isTencentVisible) {
                                                    $('#documentPermissions').text(formatLang.visibleToallpartners3);
                                                }
                                            } else {
                                                if ($('#documentPermissions')[0]) {
                                                    $('#documentPermissions').remove();
                                                }
                                            }
                                        }
                                    });
                                }
                            }, 500);
                            endTimeId = setTimeout(() => {
                                clearInterval(timeId);
                            }, 2000);
                        });
                    }
                }, 500);
                endTimeId = setTimeout(() => {
                    clearInterval(timeId);
                }, 3000);
            }
            getisEpibolyAll(pageId).then((data) => {
                if (data.result) {
                    if (data.result.isEpibolyVisible || data.result.isTencentVisible) {
                        $('#content-metadata-page-restrictions').after('<span id="documentPermissions" style="font-size:14px;color:#ff6600;padding:0 10px 0 5px;"></span>')
                            .parent()
                            .css({ display: 'flex', alignItems: 'center' });
                        const permission = data.result;
                        if (permission.isEpibolyVisible && !permission.isTencentVisible) {
                            $('#documentPermissions').text(formatLang.visibleToallpartners);
                        } else if (!permission.isEpibolyVisible && permission.isTencentVisible) {
                            $('#documentPermissions').text(formatLang.visibleToallpartners2);
                        } else if (permission.isEpibolyVisible && permission.isTencentVisible) {
                            $('#documentPermissions').text(formatLang.visibleToallpartners3);
                        }
                    } else {
                        if ($('#documentPermissions')[0]) {
                            $('#documentPermissions').remove();
                        }
                    }
                }
            });
            $('#content-metadata-page-restrictions').click(() => {
                getisEpibolyAllUpload(pageId, '#page-restrictions-dialog-save-button', '#update-page-restrictions-dialog');
            });
        }
        // 订阅文案调整
        if ($("#main .pagebody.user-profile")[0]) {
            $(".aui-navgroup-primary>ul>li").eq(3).children("a").text(formatLang.subscribe);
        }
        if ($("#section-yoursettings")[0]) {
            $("#section-yoursettings>ul>li").eq(0).remove();
        }
        if ($(".page-section #follow-container")[0]) {
            const formatLang = {}
            if (iwikiCommon.language === 'zh') {
                formatLang.subscribe2 = '关注';
                formatLang.subscribe2_1 = '订阅';
                formatLang.subscribe3 = '关注';
                formatLang.subscribe3_1 = '订阅';
                formatLang.subscribe4 = '关注';
                formatLang.subscribe4_1 = '订阅';
                formatLang.subscribe5 = '关注';
                formatLang.subscribe5_1 = '订阅';
                formatLang.subscribe6 = '关注';
                formatLang.subscribe6_1 = '订阅';
                formatLang.subscribe7 = '关注';
                formatLang.subscribe7_1 = '订阅';
            } else {
                formatLang.subscribe2 = 'following';
                formatLang.subscribe2_1 = 'subscribing';
                formatLang.subscribe3 = 'Following';
                formatLang.subscribe3_1 = 'Subscribing';
                formatLang.subscribe4 = 'Followers';
                formatLang.subscribe4_1 = 'Subscribers';
                formatLang.subscribe5 = 'followers';
                formatLang.subscribe5_1 = 'subscribers';
                formatLang.subscribe6 = 'Follow';
                formatLang.subscribe6_1 = 'Subscribe';
                formatLang.subscribe7 = 'follow';
                formatLang.subscribe7_1 = 'subscribe';
            }
            $("#activity>h2>span").text($("#activity>h2>span").text().replace(formatLang.subscribe2, formatLang.subscribe2_1));
            $("#activity>.padded").text($("#activity>.padded").text().replace(formatLang.subscribe2, formatLang.subscribe2_1));
            $("#follow>.follow-full>h2").eq(0).text($("#follow>.follow-full>h2").eq(1).text().replace(formatLang.subscribe3, formatLang.subscribe3_1));
            $("#follow>.follow-full>h2").eq(1).text($("#follow>.follow-full>h2").eq(1).text().replace(formatLang.subscribe4, formatLang.subscribe4_1));
            $("#follow>.follow-full>.description").eq(0).text($("#follow>.follow-full>.description").eq(1).text().replace(formatLang.subscribe2, formatLang.subscribe2_1));
            $("#follow>.follow-full>.description").eq(1).text($("#follow>.follow-full>.description").eq(1).text().replace(formatLang.subscribe5, formatLang.subscribe5_1));
            $("#follow .aui-button").val($("#follow .aui-button").val().replace(formatLang.subscribe6, formatLang.subscribe6_1));
            setInterval(() => {
                if ($(".follow-user-result>div")[0]) {
                    $(".follow-user-result>div").html($(".follow-user-result>div").html().replace(formatLang.subscribe7, formatLang.subscribe7_1));
                }
            }, 500)
        }
    } catch (e) {
        console.log("加载异常：", e);
    }
})(window, $);
