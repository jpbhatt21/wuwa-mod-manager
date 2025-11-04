export const VERSION = "2.0.4";
export const TEXT = {
    en: {
        generic: {
            Quit: "Quit",
            Confirm: "Confirm",
            Browse: "Browse",
            All: "All",
            Update: "Update",
            Install: "Install",
            Loading: "Loading",
            Cancel: "Cancel",
            Select: "Select",
            Settings: "Settings",
            Category: "Category",
            Downloads: "Downloads",
            Installed: "Installed",
            Warning1: "AI has been used to translate to this language. There may be some mistakes.",
            Warning2: "Some UI elements might not be aligned properly in this language.",
            Language: "Language",
            Current: "English",
            Flag: "https://flagsapi.com/GB/flat/64.png",
            Change: "Change language to ",
            SelectLang: "Select a language",
            BFR: "Report bugs or request a feature",
            Languages: {
                cn: "Chinese (Simplified)",
                en: "English",
                ru: "Russian",
                jp: "Japanese",
                kr: "Korean"
            }
        },
        _Consent: {
            _Consent: {
                RestorePoint: "Create a restore point before applying changes",
                Confirm: "Confirm changes",
            },
        },
        _Intro: {
            _Intro: {
                Greeting: "Hello, ",
                Configure: "Let's configure some basic settings",
                Continue: "Click Anywhere To Continue",
                ConfirmDir: "Confirm Your Mod Directory",
                NotFound: "We couldn't find your Mod Directory",
            },
        },
        _LeftSideBar: {
            _components: {
                _Downloads: {
                    Queue: "Queue",
                    Downloading: "Downloading",
                    Downloaded: "Downloaded",
                    NoQ: "No downloads in queue",
                    Clear: "Clear Completed",
                },
                _Restore: {
                    Restore: "Restore",
                    RestorePoints: "Restore Points",
                    CreateRestorePoint: "Create Restore Point",
                    RestorePointContent: "Restore Point Content",
                    Restricted: "Restricted during Tutorial Mode",
                    PleaseSelect: "Please select a valid restore point.",
                },
                _Settings: {
                    AutoReload: "Auto Reload",
                    _AutoReload: {
                        Disable: "Disable",
                        Enable: "Enable",
                        OnFocus: "On Focus",
                        DisableMsg: "Auto Reload Disabled",
                        WWMMMsg: "Reload when WWMM is focused ★",
                        FocusMsg: "Reload when the Game is focused",
                        ReloadMsg: "Please reload manually once on changing this.",
                    },
                    Toggle: "Toggle Mods",
                    _Toggle: {
                        LeftClick: "Left Click",
                        RightClick: "Right Click",
                    },
                    NSFW: "Online NSFW Content",
                    _NSFW: {
                        Remove: "Remove",
                        Blur: "Blur",
                        Show: "Show",
                        RemoveMsg: "Filter out all NSFW content",
                        BlurMsg: "Click to unblur NSFW content ★",
                        ShowMsg: "Do not blur NSFW content",
                    },
                    WindowBGOpacity: "Window Background Opacity",
                    BgType: "Background Type",
                    _BgType: { Blank: "Blank", Static: "Static", Dynamic: "Dynamic" },
                    WindowType: "Window Type",
                    _WindowType: { Windowed: "Windowed", Borderless: "Borderless", Fullscreen: "Fullscreen" },
                    ImportExport: "Import/Export Config",
                    _ImportExport: {
                        ImportPop: "Select config file to import",
                        ExportPop: "Export Config",
                        Import: "Import",
                        Export: "Export",
                    },
                    LaunchGame: "Launch Game",
                    _LaunchGame: { LaunchMsg1: "Launches the game via XXMI", LaunchMsg2: "when you start WWMM" },
                    HotKey: "Hotkey",
                    _HotKey: {
                        HKMsg1: "Works only when auto-reload is",
                        HKMsg2: "set to",
                        HKMsg3: "or",
                        HKMsg4: "Avoid using common shortcuts",
                        HKMsg5: "such as",
                        HKMsg6: "etc...",
                        ClearHK: "Clear Hotkey",
                        HKEmpty: "Create a preset to set hotkeys.",
                    },
                },
            },
            _Left: {
                Mode: "Mode",
                Online: "Online",
            },
            _LeftLocal: {
                Filter: "Filter",
                _Filter: {
                    Enabled: "Enabled",
                    Disabled: "Disabled",
                },
                Presets: "Presets",
                _Presets: {
                    Empty: "It's lonely here, create a preset!",
                    New: "New",
                    Save: "Save",
                },
                ModDir: "Mod Directory",
            },
            _LeftOnline: {
                Type: "Type",
            }
        },
        _Main: {
            _components: {
                _Catbar: {
                    Uncategorized: "Uncategorized",
                },
                _Filter: {
                    Show: "Show",
                },
                _Navbar: {
                    Most: "Most",
                    ModsOnly: "Mods Only",
                    Default: "Default",
                },
                _Updater: {
                    Downloading: "Downloading",
                    InstallNow: "Install Now",
                    Error: "Error",
                    Retry: "Retry",
                    Updater: "WWMM Updater",
                    CurVer: "Current version",
                    Version: "Version",
                    ago: "ago",
                    Maj: "Major Changes",
                    Min: "Minor Changes",
                    Patch: "Patches",
                    Lat: "You are on the latest version.",
                    Soon: "Update will be installed soon",
                    In: "Update will be installed in <time>s",
                    Use: "You can use the app while updates are being downloaded."
                }
            },
            _MainLocal: {
                Delete: "Delete",
                Irrev: "This action is irreversible.",
            }
        },
        _Progress: {
            Close: "Close",
            CreatingRestorePoint: "Creating Restore Point",
            RestorePointCreated: "Restore Point Created",
            RestoringFrom: "Restoring from",
            OperationCancelled: "Operation Cancelled",
            RestorationCompleted: "Restoration Completed",
            RemovingCurrentFiles: "Removing current files",
            DiscoveringFiles: "Discovering files",
            File: "File",
        },
        _RightSideBar: {
            _RightLocal: {
                NoCat: "No such category",
                Source: "Source",
                Notes: "Notes",
                HotKeys: "Hotkeys",
                Key: "Key",
                Action: "Action",
            },
            _RightOnline: {
                Reinstall: "Reinstall",
                Unknown: "Unknown",
                Preview: "Preview Images",
                About: "About",
                LatestUpd: "Latest Update",
                Sep: "Install Separately"
            }
        },
        _Tutorial: {
            p1: {
                Welcome: "Welcome to",
                Start: "Click anywhere to start the tutorial",
            },
            p2: {
                Title: "How to Toggle & Delete Mods",
                Great: "Great! Now delete the mod by clicking",
                OnTopRight: "on the top right",
                RClick: "Right click on a mod to toggle it on/off"
            },
            p3: {
                Title: "Managing your Mods",
                Rename: "Rename the mod to",
                ClickOn: "Click on",
                PImg: "to change preview image",
                Cat: "Set category to",
            },
            p4: {
                Title1: "Restore & Settings Pages",
                Msg: {
                    0: "Open either Restore or Settings Page",
                    1: "Great! Now open the Restore Page",
                    10: "Great! Now open the Settings Page",
                    11: "---"
                },
                Title2: "Going Online",
                ClickAnywhere: "Click anywhere to continue",
            },
            p5: {
                Title: "Browse & Install Mods",
                Switch: "Switch to Online Mode",
                Browse: "Browse Mods from Gamebanana",
                Update: "Update & Install Mods",
            },
            p6: {
                Title: "Installing Mods",
                Direct: "Downloads mod directly in Mods folder",
                Unzip: "Automatically unzips files",
                Preview: "Preview is downloaded",
            },
            p7: {
                Title: "Viewing Mods from a link",
                Copy: "Copy a mod link from Gamebanana",
            },
            p8: {
                Title: "Viewing Mods from a link",
                Paste: "Paste anywhere in the WWMM window",
                Opens: "Mod opens in Online Mode",
            },
            p9: {
                Title: "Tutorial Finished!",
                Again1: "You can go through the tutorial again by",
                Again2: "clicking on the App Icon on the top left",
                More: "More interactive tutorials will be added in the future. Stay tuned!",
                End: "Click anywhere to end the tutorial",
            },
            Skip: "SKIP"
        }
    },
    cn: {
        generic: {
            Quit: "退出",
            Confirm: "确认",
            Browse: "浏览",
            All: "全部",
            Update: "更新",
            Install: "安装",
            Loading: "加载中",
            Cancel: "取消",
            Select: "选择",
            Settings: "设置",
            Category: "分类",
            Downloads: "下载",
            Installed: "已安装",
            Warning1: "AI已用于翻译为此语言。可能存在一些错误。",
            Warning2: "某些UI元素在此语言中可能无法正确对齐。",
            Language: "语言",
            Current: "中文",
            Flag: "https://flagsapi.com/CN/flat/64.png",
            Change: "更改语言为 ",
            SelectLang: "选择语言",
            BFR: "报告错误或请求功能",
            Languages: {
                cn: "中文（简体）",
                en: "英语",
                ru: "俄语",
                jp: "日语",
                kr: "韩语"
            }
        },
        _Consent: {
            _Consent: {
                RestorePoint: "应用更改前创建还原点",
                Confirm: "确认更改",
            },
        },
        _Intro: {
            _Intro: {
                Greeting: "你好，",
                Configure: "让我们配置一些基本设置",
                Continue: "点击任意处继续",
                ConfirmDir: "确认您的模组目录",
                NotFound: "我们找不到您的模组目录",
            },
        },
        _LeftSideBar: {
            _components: {
                _Downloads: {
                    Queue: "队列",
                    Downloading: "下载中",
                    Downloaded: "已下载",
                    NoQ: "队列中没有下载",
                    Clear: "清除已完成",
                },
                _Restore: {
                    Restore: "还原",
                    RestorePoints: "还原点",
                    CreateRestorePoint: "创建还原点",
                    RestorePointContent: "还原点内容",
                    Restricted: "教程模式下受限",
                    PleaseSelect: "请选择一个有效的还原点。",
                },
                _Settings: {
                    AutoReload: "自动重载",
                    _AutoReload: {
                        Disable: "禁用",
                        Enable: "启用",
                        OnFocus: "聚焦时",
                        DisableMsg: "自动重载已禁用",
                        WWMMMsg: "WWMM 获得焦点时重载 ★",
                        FocusMsg: "游戏获得焦点时重载",
                        ReloadMsg: "更改此设置后请手动重载一次。",
                    },
                    Toggle: "切换模组",
                    _Toggle: {
                        LeftClick: "左键点击",
                        RightClick: "右键点击",
                    },
                    NSFW: "在线 NSFW 内容",
                    _NSFW: {
                        Remove: "移除",
                        Blur: "模糊",
                        Show: "显示",
                        RemoveMsg: "过滤所有 NSFW 内容",
                        BlurMsg: "点击取消模糊 NSFW 内容 ★",
                        ShowMsg: "不模糊 NSFW 内容",
                    },
                    WindowBGOpacity: "窗口背景不透明度",
                    BgType: "背景类型",
                    _BgType: { Blank: "空白", Static: "静态", Dynamic: "动态" },
                    WindowType: "窗口类型",
                    _WindowType: { Windowed: "窗口化", Borderless: "无边框", Fullscreen: "全屏" },
                    ImportExport: "导入/导出配置",
                    _ImportExport: {
                        ImportPop: "选择要导入的配置文件",
                        ExportPop: "导出配置",
                        Import: "导入",
                        Export: "导出",
                    },
                    LaunchGame: "启动游戏",
                    _LaunchGame: { LaunchMsg1: "通过 XXMI 启动游戏", LaunchMsg2: "当您启动 WWMM 时" },
                    HotKey: "热键",
                    _HotKey: {
                        HKMsg1: "仅在自动重载设置为",
                        HKMsg2: "或",
                        HKMsg3: "时工作",
                        HKMsg4: "避免使用常见快捷键",
                        HKMsg5: "例如",
                        HKMsg6: "等...",
                        ClearHK: "清除热键",
                        HKEmpty: "创建预设以设置热键。",
                    },
                },
            },
            _Left: {
                Mode: "模式",
                Online: "在线",
            },
            _LeftLocal: {
                Filter: "过滤器",
                _Filter: {
                    Enabled: "已启用",
                    Disabled: "已禁用",
                },
                Presets: "预设",
                _Presets: {
                    Empty: "这里很孤单，创建一个预设吧！",
                    New: "新建",
                    Save: "保存",
                },
                ModDir: "模组目录",
            },
            _LeftOnline: {
                Type: "类型",
            }
        },
        _Main: {
            _components: {
                _Catbar: {
                    Uncategorized: "未分类",
                },
                _Filter: {
                    Show: "显示",
                },
                _Navbar: {
                    Most: "最多",
                    ModsOnly: "仅模组",
                    Default: "默认",
                },
                _Updater: {
                    Downloading: "下载中",
                    InstallNow: "立即安装",
                    Error: "错误",
                    Retry: "重试",
                    Updater: "WWMM 更新器",
                    CurVer: "当前版本",
                    Version: "版本",
                    ago: "前",
                    Maj: "主要更改",
                    Min: "次要更改",
                    Patch: "补丁",
                    Lat: "您使用的是最新版本。",
                    Soon: "更新将很快安装",
                    In: "更新将在 <time> 秒后安装",
                    Use: "您可以在下载更新时使用应用程序。"
                }
            },
            _MainLocal: {
                Delete: "删除",
                Irrev: "此操作不可逆转。",
            }
        },
        _Progress: {
            Close: "关闭",
            CreatingRestorePoint: "正在创建还原点",
            RestorePointCreated: "还原点已创建",
            RestoringFrom: "正在从以下位置还原",
            RemovingCurrentFiles: "正在移除当前文件",
            DiscoveringFiles: "正在发现文件",
            OperationCancelled: "操作已取消",
            RestorationCompleted: "还原已完成",
            File: "文件",
        },
        _RightSideBar: {
            _RightLocal: {
                NoCat: "没有此类别",
                Source: "来源",
                Notes: "备注",
                HotKeys: "热键",
                Key: "按键",
                Action: "操作",
            },
            _RightOnline: {
                Reinstall: "重新安装",
                Unknown: "未知",
                Preview: "预览图片",
                About: "关于",
                LatestUpd: "最新更新",
                Sep: "单独安装"
            }
        },
        _Tutorial: {
            p1: {
                Welcome: "欢迎来到",
                Start: "点击任意处开始教程",
            },
            p2: {
                Title: "如何切换和删除模组",
                Great: "很好！现在通过点击来删除模组",
                OnTopRight: "在右上角",
                RClick: "右键点击模组以切换开/关"
            },
            p3: {
                Title: "管理您的模组",
                Rename: "将模组重命名为",
                ClickOn: "点击",
                PImg: "更改预览图片",
                Cat: "设置分类为",
            },
            p4: {
                Title1: "还原和设置页面",
                Msg: {
                    0: "打开还原或设置页面",
                    1: "很好！现在打开还原页面",
                    10: "很好！现在打开设置页面",
                    11: "---"
                },
                Title2: "上线",
                ClickAnywhere: "点击任意处继续",
            },
            p5: {
                Title: "浏览和安装模组",
                Switch: "切换到在线模式",
                Browse: "从 Gamebanana 浏览模组",
                Update: "更新和安装模组",
            },
            p6: {
                Title: "安装模组",
                Direct: "直接下载模组到模组文件夹",
                Unzip: "自动解压文件",
                Preview: "下载预览图",
            },
            p7: {
                Title: "从链接查看模组",
                Copy: "从 Gamebanana 复制模组链接",
            },
            p8: {
                Title: "从链接查看模组",
                Paste: "在 WWMM 窗口的任意位置粘贴",
                Opens: "模组在在线模式下打开",
            },
            p9: {
                Title: "教程完成！",
                Again1: "您可以通过",
                Again2: "点击左上角的应用图标再次进行教程",
                More: "未来将添加更多交互式教程。敬请期待！",
                End: "点击任意处结束教程",
            },
            Skip: "跳过"
        }
    },
    ru: {
        generic: {
            Quit: "Выход",
            Confirm: "Подтвердить",
            Browse: "Обзор",
            All: "Все",
            Update: "Обновить",
            Install: "Установить",
            Loading: "Загрузка",
            Cancel: "Отмена",
            Select: "Выбрать",
            Settings: "Настройки",
            Category: "Категория",
            Downloads: "Загрузки",
            Installed: "Установлено",
            Warning1: "ИИ был использован для перевода на этот язык. Возможны некоторые ошибки.",
            Warning2: "Некоторые элементы интерфейса могут быть неправильно выровнены на этом языке.",
            Language: "Язык",
            Current: "Русский",
            Flag: "https://flagsapi.com/RU/flat/64.png",
            Change: "Изменить язык на ",
            SelectLang: "Выберите язык",
            BFR: "Сообщить об ошибках или запросить функцию",
            Languages: {
                cn: "Китайский (упрощенный)",
                en: "Английский",
                ru: "Русский",
                jp: "Японский",
                kr: "Корейский"
            }
        },
        _Consent: {
            _Consent: {
                RestorePoint: "Создать точку восстановления перед применением изменений",
                Confirm: "Подтвердить изменения",
            },
        },
        _Intro: {
            _Intro: {
                Greeting: "Привет, ",
                Configure: "Давайте настроим основные параметры",
                Continue: "Нажмите в любом месте для продолжения",
                ConfirmDir: "Подтвердите каталог модов",
                NotFound: "Мы не смогли найти ваш каталог модов",
            },
        },
        _LeftSideBar: {
            _components: {
                _Downloads: {
                    Queue: "Очередь",
                    Downloading: "Загружается",
                    Downloaded: "Загружено",
                    NoQ: "Нет загрузок в очереди",
                    Clear: "Очистить завершенные",
                },
                _Restore: {
                    Restore: "Восстановить",
                    RestorePoints: "Точки восстановления",
                    CreateRestorePoint: "Создать точку восстановления",
                    RestorePointContent: "Содержимое точки восстановления",
                    Restricted: "Ограничено в режиме обучения",
                    PleaseSelect: "Пожалуйста, выберите действительную точку восстановления.",
                },
                _Settings: {
                    AutoReload: "Автоперезагрузка",
                    _AutoReload: {
                        Disable: "Отключить",
                        Enable: "Включить",
                        OnFocus: "При фокусе",
                        DisableMsg: "Автоперезагрузка отключена",
                        WWMMMsg: "Перезагружать при фокусе на WWMM ★",
                        FocusMsg: "Перезагружать при фокусе на игре",
                        ReloadMsg: "Пожалуйста, перезагрузите вручную один раз после изменения этого параметра.",
                    },
                    Toggle: "Переключить моды",
                    _Toggle: {
                        LeftClick: "Левый клик",
                        RightClick: "Правый клик",
                    },
                    NSFW: "Онлайн NSFW контент",
                    _NSFW: {
                        Remove: "Удалить",
                        Blur: "Размыть",
                        Show: "Показать",
                        RemoveMsg: "Отфильтровать весь NSFW контент",
                        BlurMsg: "Нажмите, чтобы размыть NSFW контент ★",
                        ShowMsg: "Не размывать NSFW контент",
                    },
                    WindowBGOpacity: "Прозрачность фона окна",
                    BgType: "Тип фона",
                    _BgType: { Blank: "Пустой", Static: "Статичный", Dynamic: "Динамичный" },
                    WindowType: "Тип окна",
                    _WindowType: { Windowed: "Оконный", Borderless: "Без границ", Fullscreen: "Полноэкранный" },
                    ImportExport: "Импорт/Экспорт конфигурации",
                    _ImportExport: {
                        ImportPop: "Выберите файл конфигурации для импорта",
                        ExportPop: "Экспорт конфигурации",
                        Import: "Импорт",
                        Export: "Экспорт",
                    },
                    LaunchGame: "Запустить игру",
                    _LaunchGame: { LaunchMsg1: "Запускает игру через XXMI", LaunchMsg2: "при запуске WWMM" },
                    HotKey: "Горячая клавиша",
                    _HotKey: {
                        HKMsg1: "Работает только при автоперезагрузке",
                        HKMsg2: "установленной на",
                        HKMsg3: "или",
                        HKMsg4: "Избегайте использования общих сочетаний клавиш",
                        HKMsg5: "таких как",
                        HKMsg6: "и т.д...",
                        ClearHK: "Очистить горячую клавишу",
                        HKEmpty: "Создайте пресет для настройки горячих клавиш.",
                    },
                },
            },
            _Left: {
                Mode: "Режим",
                Online: "Онлайн",
            },
            _LeftLocal: {
                Filter: "Фильтр",
                _Filter: {
                    Enabled: "Включено",
                    Disabled: "Отключено",
                },
                Presets: "Пресеты",
                _Presets: {
                    Empty: "Здесь одиноко, создайте пресет!",
                    New: "Новый",
                    Save: "Сохранить",
                },
                ModDir: "Каталог модов",
            },
            _LeftOnline: {
                Type: "Тип",
            }
        },
        _Main: {
            _components: {
                _Catbar: {
                    Uncategorized: "Без категории",
                },
                _Filter: {
                    Show: "Показать",
                },
                _Navbar: {
                    Most: "Больше всего",
                    ModsOnly: "Только моды",
                    Default: "По умолчанию",
                },
                _Updater: {
                    Downloading: "Загружается",
                    InstallNow: "Установить сейчас",
                    Error: "Ошибка",
                    Retry: "Повторить",
                    Updater: "Обновлятор WWMM",
                    CurVer: "Текущая версия",
                    Version: "Версия",
                    ago: "назад",
                    Maj: "Основные изменения",
                    Min: "Мелкие изменения",
                    Patch: "Исправления",
                    Lat: "У вас установлена последняя версия.",
                    Soon: "Обновление будет установлено скоро",
                    In: "Обновление будет установлено через <time> с",
                    Use: "Вы можете использовать приложение во время загрузки обновлений."
                }
            },
            _MainLocal: {
                Delete: "Удалить",
                Irrev: "Это действие необратимо.",
            }
        },
        _Progress: {
            Close: "Закрыть",
            CreatingRestorePoint: "Создание точки восстановления",
            RestorePointCreated: "Точка восстановления создана",
            RestoringFrom: "Восстановление из",
            RemovingCurrentFiles: "Удаление текущих файлов",
            DiscoveringFiles: "Обнаружение файлов",
            OperationCancelled: "Операция отменена",
            RestorationCompleted: "Восстановление завершено",
            File: "Файл",
        },
        _RightSideBar: {
            _RightLocal: {
                NoCat: "Нет такой категории",
                Source: "Источник",
                Notes: "Заметки",
                HotKeys: "Горячие клавиши",
                Key: "Клавиша",
                Action: "Действие",
            },
            _RightOnline: {
                Reinstall: "Переустановить",
                Unknown: "Неизвестно",
                Preview: "Превью изображения",
                About: "О программе",
                LatestUpd: "Последнее обновление",
                Sep: "Установить отдельно"
            }
        },
        _Tutorial: {
            p1: {
                Welcome: "Добро пожаловать в",
                Start: "Нажмите в любом месте, чтобы начать обучение",
            },
            p2: {
                Title: "Как переключать и удалять моды",
                Great: "Отлично! Теперь удалите мод, нажав",
                OnTopRight: "в правом верхнем углу",
                RClick: "Щелкните правой кнопкой мыши по моду, чтобы включить/выключить его"
            },
            p3: {
                Title: "Управление вашими модами",
                Rename: "Переименуйте мод в",
                ClickOn: "Нажмите на",
                PImg: "чтобы изменить превью изображение",
                Cat: "Установите категорию на",
            },
            p4: {
                Title1: "Страницы восстановления и настроек",
                Msg: {
                    0: "Откройте страницу восстановления или настроек",
                    1: "Отлично! Теперь откройте страницу восстановления",
                    10: "Отлично! Теперь откройте страницу настроек",
                    11: "---"
                },
                Title2: "Переход в онлайн",
                ClickAnywhere: "Нажмите в любом месте для продолжения",
            },
            p5: {
                Title: "Просмотр и установка модов",
                Switch: "Переключиться в онлайн режим",
                Browse: "Просматривать моды с Gamebanana",
                Update: "Обновлять и устанавливать моды",
            },
            p6: {
                Title: "Установка модов",
                Direct: "Загружает мод прямо в папку модов",
                Unzip: "Автоматически распаковывает файлы",
                Preview: "Превью загружается",
            },
            p7: {
                Title: "Просмотр модов по ссылке",
                Copy: "Скопируйте ссылку мода с Gamebanana",
            },
            p8: {
                Title: "Просмотр модов по ссылке",
                Paste: "Вставьте в любом месте окна WWMM",
                Opens: "Мод открывается в онлайн режиме",
            },
            p9: {
                Title: "Обучение завершено!",
                Again1: "Вы можете пройти обучение снова,",
                Again2: "нажав на иконку приложения в левом верхнем углу",
                More: "В будущем будут добавлены более интерактивные обучающие материалы. Следите за обновлениями!",
                End: "Нажмите в любом месте, чтобы завершить обучение",
            },
            Skip: "ПРОПУСТИТЬ"
        }
    },
    jp: {
        generic: {
            Quit: "終了",
            Confirm: "確認",
            Browse: "参照",
            All: "すべて",
            Update: "更新",
            Install: "インストール",
            Loading: "読み込み中",
            Cancel: "キャンセル",
            Select: "選択",
            Settings: "設定",
            Category: "カテゴリ",
            Downloads: "ダウンロード",
            Installed: "インストール済み",
            Warning1: "この言語への翻訳にAIが使用されました。いくつかの間違いがある可能性があります。",
            Warning2: "一部のUI要素がこの言語では適切に配置されない場合があります。",
            Language: "言語",
            Current: "日本語",
            Flag: "https://flagsapi.com/JP/flat/64.png",
            Change: "言語を変更： ",
            SelectLang: "言語を選択",
            BFR: "バグを報告するか機能をリクエスト",
            Languages: {
                cn: "中国語（簡体字）",
                en: "英語",
                ru: "ロシア語",
                jp: "日本語",
                kr: "韓国語"
            }
        },
        _Consent: {
            _Consent: {
                RestorePoint: "変更を適用する前に復元ポイントを作成",
                Confirm: "変更を確認",
            },
        },
        _Intro: {
            _Intro: {
                Greeting: "こんにちは、",
                Configure: "基本設定を行いましょう",
                Continue: "どこかをクリックして続行",
                ConfirmDir: "Modディレクトリを確認",
                NotFound: "Modディレクトリが見つかりませんでした",
            },
        },
        _LeftSideBar: {
            _components: {
                _Downloads: {
                    Queue: "キュー",
                    Downloading: "ダウンロード中",
                    Downloaded: "ダウンロード完了",
                    NoQ: "キューにダウンロードがありません",
                    Clear: "完了したものをクリア",
                },
                _Restore: {
                    Restore: "復元",
                    RestorePoints: "復元ポイント",
                    CreateRestorePoint: "復元ポイントを作成",
                    RestorePointContent: "復元ポイントの内容",
                    Restricted: "チュートリアルモードでは制限されています",
                    PleaseSelect: "有効な復元ポイントを選択してください。",
                },
                _Settings: {
                    AutoReload: "自動リロード",
                    _AutoReload: {
                        Disable: "無効",
                        Enable: "有効",
                        OnFocus: "フォーカス時",
                        DisableMsg: "自動リロードが無効になりました",
                        WWMMMsg: "WWMMがフォーカスされた時にリロード ★",
                        FocusMsg: "ゲームがフォーカスされた時にリロード",
                        ReloadMsg: "この設定を変更した後、一度手動でリロードしてください。",
                    },
                    Toggle: "Modの切り替え",
                    _Toggle: {
                        LeftClick: "左クリック",
                        RightClick: "右クリック",
                    },
                    NSFW: "オンライン NSFW コンテンツ",
                    _NSFW: {
                        Remove: "除去",
                        Blur: "ぼかし",
                        Show: "表示",
                        RemoveMsg: "すべてのNSFWコンテンツをフィルタリング",
                        BlurMsg: "クリックしてNSFWコンテンツのぼかしを解除 ★",
                        ShowMsg: "NSFWコンテンツをぼかさない",
                    },
                    WindowBGOpacity: "ウィンドウ背景の不透明度",
                    BgType: "背景タイプ",
                    _BgType: { Blank: "空白", Static: "静的", Dynamic: "動的" },
                    WindowType: "ウィンドウタイプ",
                    _WindowType: { Windowed: "ウィンドウ", Borderless: "ボーダーレス", Fullscreen: "フルスクリーン" },
                    ImportExport: "設定のインポート/エクスポート",
                    _ImportExport: {
                        ImportPop: "インポートする設定ファイルを選択",
                        ExportPop: "設定のエクスポート",
                        Import: "インポート",
                        Export: "エクスポート",
                    },
                    LaunchGame: "ゲーム起動",
                    _LaunchGame: { LaunchMsg1: "XXMIを介してゲームを起動", LaunchMsg2: "WWMMを起動する時" },
                    HotKey: "ホットキー",
                    _HotKey: {
                        HKMsg1: "自動リロードが",
                        HKMsg2: "に設定されている時のみ動作",
                        HKMsg3: "または",
                        HKMsg4: "一般的なショートカットの使用を避ける",
                        HKMsg5: "例：",
                        HKMsg6: "など...",
                        ClearHK: "ホットキーをクリア",
                        HKEmpty: "ホットキーを設定するにはプリセットを作成してください。",
                    },
                },
            },
            _Left: {
                Mode: "モード",
                Online: "オンライン",
            },
            _LeftLocal: {
                Filter: "フィルター",
                _Filter: {
                    Enabled: "有効",
                    Disabled: "無効",
                },
                Presets: "プリセット",
                _Presets: {
                    Empty: "寂しいですね、プリセットを作成しましょう！",
                    New: "新規",
                    Save: "保存",
                },
                ModDir: "Modディレクトリ",
            },
            _LeftOnline: {
                Type: "タイプ",
            }
        },
        _Main: {
            _components: {
                _Catbar: {
                    Uncategorized: "未分類",
                },
                _Filter: {
                    Show: "表示",
                },
                _Navbar: {
                    Most: "最多",
                    ModsOnly: "Modのみ",
                    Default: "デフォルト",
                },
                _Updater: {
                    Downloading: "ダウンロード中",
                    InstallNow: "今すぐインストール",
                    Error: "エラー",
                    Retry: "再試行",
                    Updater: "WWMM アップデーター",
                    CurVer: "現在のバージョン",
                    Version: "バージョン",
                    ago: "前",
                    Maj: "主要な変更",
                    Min: "軽微な変更",
                    Patch: "パッチ",
                    Lat: "最新バージョンを使用しています。",
                    Soon: "まもなくアップデートがインストールされます",
                    In: "<time>秒後にアップデートがインストールされます",
                    Use: "アップデートのダウンロード中もアプリケーションを使用できます。"
                }
            },
            _MainLocal: {
                Delete: "削除",
                Irrev: "この操作は元に戻せません。",
            }
        },
        _Progress: {
            Close: "閉じる",
            CreatingRestorePoint: "復元ポイントを作成中",
            RestorePointCreated: "復元ポイントが作成されました",
            RestoringFrom: "復元中",
            RemovingCurrentFiles: "現在のファイルを削除中",
            DiscoveringFiles: "ファイルを検出中",
            OperationCancelled: "操作がキャンセルされました",
            RestorationCompleted: "復元が完了しました",
            File: "ファイル",
        },
        _RightSideBar: {
            _RightLocal: {
                NoCat: "そのようなカテゴリはありません",
                Source: "ソース",
                Notes: "ノート",
                HotKeys: "ホットキー",
                Key: "キー",
                Action: "アクション",
            },
            _RightOnline: {
                Reinstall: "再インストール",
                Unknown: "不明",
                Preview: "プレビュー画像",
                About: "詳細",
                LatestUpd: "最新アップデート",
                Sep: "個別にインストール"
            }
        },
        _Tutorial: {
            p1: {
                Welcome: "ようこそ",
                Start: "どこかをクリックしてチュートリアルを開始",
            },
            p2: {
                Title: "Modの切り替えと削除方法",
                Great: "素晴らしい！次にModを削除するには",
                OnTopRight: "右上の",
                RClick: "Modを右クリックしてオン/オフを切り替え"
            },
            p3: {
                Title: "Modの管理",
                Rename: "Modの名前を変更",
                ClickOn: "クリック",
                PImg: "プレビュー画像を変更",
                Cat: "カテゴリを設定",
            },
            p4: {
                Title1: "復元と設定ページ",
                Msg: {
                    0: "復元または設定ページを開く",
                    1: "素晴らしい！次に復元ページを開く",
                    10: "素晴らしい！次に設定ページを開く",
                    11: "---"
                },
                Title2: "オンラインに移行",
                ClickAnywhere: "どこかをクリックして続行",
            },
            p5: {
                Title: "Modの閲覧とインストール",
                Switch: "オンラインモードに切り替え",
                Browse: "GamebananaからModを閲覧",
                Update: "Modの更新とインストール",
            },
            p6: {
                Title: "Modのインストール",
                Direct: "Modフォルダに直接ダウンロード",
                Unzip: "ファイルを自動解凍",
                Preview: "プレビューがダウンロードされます",
            },
            p7: {
                Title: "リンクからModを表示",
                Copy: "GamebananaからModリンクをコピー",
            },
            p8: {
                Title: "リンクからModを表示",
                Paste: "WWMMウィンドウのどこかに貼り付け",
                Opens: "Modがオンラインモードで開きます",
            },
            p9: {
                Title: "チュートリアル完了！",
                Again1: "チュートリアルをもう一度実行するには",
                Again2: "左上のアプリアイコンをクリック",
                More: "今後、より多くのインタラクティブなチュートリアルが追加される予定です。お楽しみに！",
                End: "どこかをクリックしてチュートリアルを終了",
            },
            Skip: "スキップ"
        }
    },
    kr: {
        generic: {
            Quit: "종료",
            Confirm: "확인",
            Browse: "찾아보기",
            All: "모두",
            Update: "업데이트",
            Install: "설치",
            Loading: "로딩 중",
            Cancel: "취소",
            Select: "선택",
            Settings: "설정",
            Category: "카테고리",
            Downloads: "다운로드",
            Installed: "설치됨",
            Warning1: "이 언어로의 번역에 AI가 사용되었습니다. 일부 실수가 있을 수 있습니다.",
            Warning2: "일부 UI 요소가 이 언어에서 제대로 정렬되지 않을 수 있습니다.",
            Language: "언어",
            Current: "한국어",
            Flag: "https://flagsapi.com/KR/flat/64.png",
            Change: "언어 변경: ",
            SelectLang: "언어 선택",
            BFR: "버그 신고 또는 기능 요청",
            Languages: {
                cn: "중국어 (간체)",
                en: "영어",
                ru: "러시아어",
                jp: "일본어",
                kr: "한국어"
            }
        },
        _Consent: {
            _Consent: {
                RestorePoint: "변경 사항을 적용하기 전에 복원 지점 생성",
                Confirm: "변경 사항 확인",
            },
        },
        _Intro: {
            _Intro: {
                Greeting: "안녕하세요, ",
                Configure: "기본 설정을 구성해 봅시다",
                Continue: "아무 곳이나 클릭하여 계속",
                ConfirmDir: "모드 디렉토리 확인",
                NotFound: "모드 디렉토리를 찾을 수 없습니다",
            },
        },
        _LeftSideBar: {
            _components: {
                _Downloads: {
                    Queue: "대기열",
                    Downloading: "다운로드 중",
                    Downloaded: "다운로드 완료",
                    NoQ: "대기열에 다운로드가 없습니다",
                    Clear: "완료된 항목 정리",
                },
                _Restore: {
                    Restore: "복원",
                    RestorePoints: "복원 지점",
                    CreateRestorePoint: "복원 지점 생성",
                    RestorePointContent: "복원 지점 내용",
                    Restricted: "튜토리얼 모드에서 제한됨",
                    PleaseSelect: "유효한 복원 지점을 선택하세요.",
                },
                _Settings: {
                    AutoReload: "자동 새로고침",
                    _AutoReload: {
                        Disable: "비활성화",
                        Enable: "활성화",
                        OnFocus: "포커스 시",
                        DisableMsg: "자동 새로고침이 비활성화되었습니다",
                        WWMMMsg: "WWMM이 포커스될 때 새로고침 ★",
                        FocusMsg: "게임이 포커스될 때 새로고침",
                        ReloadMsg: "이 설정을 변경한 후 한 번 수동으로 새로고침해주세요.",
                    },
                    Toggle: "모드 토글",
                    _Toggle: {
                        LeftClick: "왼쪽 클릭",
                        RightClick: "오른쪽 클릭",
                    },
                    NSFW: "온라인 NSFW 콘텐츠",
                    _NSFW: {
                        Remove: "제거",
                        Blur: "흐림",
                        Show: "표시",
                        RemoveMsg: "모든 NSFW 콘텐츠 필터링",
                        BlurMsg: "클릭하여 NSFW 콘텐츠 흐림 해제 ★",
                        ShowMsg: "NSFW 콘텐츠를 흐리게 하지 않음",
                    },
                    WindowBGOpacity: "창 배경 불투명도",
                    BgType: "배경 타입",
                    _BgType: { Blank: "공백", Static: "정적", Dynamic: "동적" },
                    WindowType: "창 타입",
                    _WindowType: { Windowed: "창 모드", Borderless: "테두리 없음", Fullscreen: "전체 화면" },
                    ImportExport: "설정 가져오기/내보내기",
                    _ImportExport: {
                        ImportPop: "가져올 설정 파일 선택",
                        ExportPop: "설정 내보내기",
                        Import: "가져오기",
                        Export: "내보내기",
                    },
                    LaunchGame: "게임 실행",
                    _LaunchGame: { LaunchMsg1: "XXMI를 통해 게임 실행", LaunchMsg2: "WWMM을 시작할 때" },
                    HotKey: "단축키",
                    _HotKey: {
                        HKMsg1: "자동 새로고침이",
                        HKMsg2: "로 설정되어 있을 때만 작동",
                        HKMsg3: "또는",
                        HKMsg4: "일반적인 단축키 사용을 피하세요",
                        HKMsg5: "예:",
                        HKMsg6: "등...",
                        ClearHK: "단축키 지우기",
                        HKEmpty: "단축키를 설정하려면 프리셋을 만드세요.",
                    },
                },
            },
            _Left: {
                Mode: "모드",
                Online: "온라인",
            },
            _LeftLocal: {
                Filter: "필터",
                _Filter: {
                    Enabled: "활성화됨",
                    Disabled: "비활성화됨",
                },
                Presets: "프리셋",
                _Presets: {
                    Empty: "외롭네요, 프리셋을 만들어보세요!",
                    New: "새로 만들기",
                    Save: "저장",
                },
                ModDir: "모드 디렉토리",
            },
            _LeftOnline: {
                Type: "타입",
            }
        },
        _Main: {
            _components: {
                _Catbar: {
                    Uncategorized: "분류되지 않음",
                },
                _Filter: {
                    Show: "표시",
                },
                _Navbar: {
                    Most: "가장 많은",
                    ModsOnly: "모드만",
                    Default: "기본값",
                },
                _Updater: {
                    Downloading: "다운로드 중",
                    InstallNow: "지금 설치",
                    Error: "오류",
                    Retry: "다시 시도",
                    Updater: "WWMM 업데이터",
                    CurVer: "현재 버전",
                    Version: "버전",
                    ago: "전",
                    Maj: "주요 변경 사항",
                    Min: "경미한 변경 사항",
                    Patch: "패치",
                    Lat: "최신 버전을 사용 중입니다.",
                    Soon: "곧 업데이트가 설치됩니다",
                    In: "<time>초 후에 업데이트가 설치됩니다",
                    Use: "업데이트를 다운로드하는 동안 앱을 사용할 수 있습니다."
                }
            },
            _MainLocal: {
                Delete: "삭제",
                Irrev: "이 작업은 되돌릴 수 없습니다.",
            }
        },
        _Progress: {
            Close: "닫기",
            CreatingRestorePoint: "복원 지점 생성 중",
            RestorePointCreated: "복원 지점이 생성되었습니다",
            RestoringFrom: "다음에서 복원 중",
            RemovingCurrentFiles: "현재 파일 제거 중",
            DiscoveringFiles: "파일 검색 중",
            OperationCancelled: "작업이 취소되었습니다",
            RestorationCompleted: "복원이 완료되었습니다",
            File: "파일",
        },
        _RightSideBar: {
            _RightLocal: {
                NoCat: "해당 카테고리가 없습니다",
                Source: "소스",
                Notes: "노트",
                HotKeys: "단축키",
                Key: "키",
                Action: "액션",
            },
            _RightOnline: {
                Reinstall: "재설치",
                Unknown: "알 수 없음",
                Preview: "미리보기 이미지",
                About: "정보",
                LatestUpd: "최신 업데이트",
                Sep: "개별 설치"
            }
        },
        _Tutorial: {
            p1: {
                Welcome: "환영합니다",
                Start: "아무 곳이나 클릭하여 튜토리얼 시작",
            },
            p2: {
                Title: "모드 토글 및 삭제 방법",
                Great: "훌륭합니다! 이제 모드를 삭제하려면",
                OnTopRight: "우상단의",
                RClick: "모드에 오른쪽 클릭하여 켜기/끄기 전환"
            },
            p3: {
                Title: "모드 관리",
                Rename: "모드 이름을 다음으로 변경",
                ClickOn: "클릭",
                PImg: "미리보기 이미지 변경",
                Cat: "카테고리를 다음으로 설정",
            },
            p4: {
                Title1: "복원 및 설정 페이지",
                Msg: {
                    0: "복원 또는 설정 페이지 열기",
                    1: "훌륭합니다! 이제 복원 페이지를 여세요",
                    10: "훌륭합니다! 이제 설정 페이지를 여세요",
                    11: "---"
                },
                Title2: "온라인으로 이동",
                ClickAnywhere: "아무 곳이나 클릭하여 계속",
            },
            p5: {
                Title: "모드 탐색 및 설치",
                Switch: "온라인 모드로 전환",
                Browse: "Gamebanana에서 모드 탐색",
                Update: "모드 업데이트 및 설치",
            },
            p6: {
                Title: "모드 설치",
                Direct: "모드 폴더에 직접 다운로드",
                Unzip: "파일 자동 압축 해제",
                Preview: "미리보기가 다운로드됩니다",
            },
            p7: {
                Title: "링크에서 모드 보기",
                Copy: "Gamebanana에서 모드 링크 복사",
            },
            p8: {
                Title: "링크에서 모드 보기",
                Paste: "WWMM 창 아무 곳에나 붙여넣기",
                Opens: "모드가 온라인 모드에서 열립니다",
            },
            p9: {
                Title: "튜토리얼 완료!",
                Again1: "다시 튜토리얼을 진행하려면",
                Again2: "왼쪽 상단의 앱 아이콘을 클릭하세요",
                More: "앞으로 더 많은 대화형 튜토리얼이 추가될 예정입니다. 기대해주세요!",
                End: "아무 곳이나 클릭하여 튜토리얼 종료",
            },
            Skip: "건너뛰기"
        }
    },
};
export const CSS_CLASSES = {
	CARD_BASE:
		"w-56 h-72 hover:outline-accent outline-offset-7 outline-accent/0 hover:scale-105 active:scale-95 select-none bg-card rounded-lg border duration-200 outline overflow-hidden",
	CARD_SELECTED: "selectedCard",
	CARD_ACTIVE: "activeCard",

	INPUT_TRANSPARENT: "w-56 pointer-events-none select-none overflow-hidden border-0 text-ellipsis",
	INPUT_CARD:
		"w-56 cursor-pointer select-none focus-within:select-auto overflow-hidden h-8 focus-visible:ring-[0px] border-0 text-ellipsis",

	FADE_IN: "fade-in",
	GRID_AUTO_FILL: "grid justify-center w-full h-full py-4",

	BG_BACKDROP: "bg-background/50 backdrop-blur",
	BG_TRANSPARENT: "bg-background/50",
} as const;
export const COMMON_STYLES = {
	TRANSPARENT_BG: { backgroundColor: "#fff0" },
	HIDDEN_OPACITY: { opacity: "0" },
	FULL_OPACITY: { opacity: "1" },

	CARD_GRID: {
		gridTemplateColumns: "repeat(auto-fill, minmax(256px, 256px))",
		gridAutoRows: "288px",
		columnGap: "0px",
		rowGap: "32px",
		justifyItems: "center" as const,
	},
} as const;
export const ANIMATIONS = {
	FADE: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: 0.3 },
	},

	SCALE: {
		initial: { opacity: 0, scale: 0.9 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.9 },
		transition: { duration: 0.2 },
	},
} as const;
export const TIME = {
	SECOND: 1000,
	MINUTE: 60 * 1000,
	HOUR: 60 * 60 * 1000,
	DAY: 24 * 60 * 60 * 1000,
	YEAR: 365 * 24 * 60 * 60 * 1000,
} as const;
export const FS = {
	DISABLED_PREFIX: "DISABLED_",
	SEPARATOR: "/",
	BACKUP_SUFFIX: "_backup",
} as const;
export const UI = {
	CARD_WIDTH: 256,
	CARD_HEIGHT: 288,
	SIDEBAR_COLLAPSED_WIDTH: "3rem",
	DEFAULT_THUMBNAIL: "/default-thumbnail.png",
} as const;
export const PRIORITY_KEYS = ["Alt", "Ctrl", "Shift", "Capslock", "Tab", "Up", "Down", "Left", "Right"] as const;
export const MOUSE_BUTTONS = {
	LEFT: 0,
	MIDDLE: 1,
	RIGHT: 2,
} as const;
export const TRANSITIONS = {
	ONLINE_DELAY: "0.3s",
	OFFLINE_DELAY: "0s",
	DEFAULT_DURATION: 0.3,
} as const;
export const HEALTH_CHECK = "https://health.wwmm.bhatt.jp/health";

export const LANG_LIST = [
	{
		Name: TEXT.en.generic.Current,
		Flag: TEXT.en.generic.Flag,
    Code: 'en'
	},
	{
		Name: TEXT.cn.generic.Current,
		Flag: TEXT.cn.generic.Flag,
    Code: 'cn'
	},
	{
		Name: TEXT.ru.generic.Current,
		Flag: TEXT.ru.generic.Flag,
		Code: 'ru'
	},
	{
		Name: TEXT.jp.generic.Current,
		Flag: TEXT.jp.generic.Flag,
		Code: 'jp'
	},
	{
		Name: TEXT.kr.generic.Current,
		Flag: TEXT.kr.generic.Flag,
		Code: 'kr'
	},
];

export const TEMP_CAT=[
    {
      "_idRow": 30257,
      "_sName": "Aalto",
      "_nItemCount": 8,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30257",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c4ff33f3b.png"
    },
    {
      "_idRow": 39143,
      "_sName": "Augusta",
      "_nItemCount": 44,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/39143"
    },
    {
      "_idRow": 30251,
      "_sName": "Baizhi",
      "_nItemCount": 43,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30251",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c39f41dda.png"
    },
    {
      "_idRow": 35523,
      "_sName": "Brant",
      "_nItemCount": 14,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/35523",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/67c981a895579.png"
    },
    {
      "_idRow": 30262,
      "_sName": "Calcharo",
      "_nItemCount": 17,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30262",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c5f44ca4e.png"
    },
    {
      "_idRow": 33179,
      "_sName": "Camellya",
      "_nItemCount": 103,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/33179",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/675b7f303af84.png"
    },
    {
      "_idRow": 36003,
      "_sName": "Cantarella",
      "_nItemCount": 65,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/36003",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6812a36c23457.png"
    },
    {
      "_idRow": 34264,
      "_sName": "Carlotta",
      "_nItemCount": 93,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/34264",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6812a3cf60524.png"
    },
    {
      "_idRow": 37392,
      "_sName": "Cartethyia",
      "_nItemCount": 67,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/37392",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/686f2a0b0506c.png"
    },
    {
      "_idRow": 30265,
      "_sName": "Changli",
      "_nItemCount": 130,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30265",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c68095b05.png"
    },
    {
      "_idRow": 30247,
      "_sName": "Chixia",
      "_nItemCount": 30,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30247",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c25a55aad.png"
    },
    {
      "_idRow": 36990,
      "_sName": "Ciaccona",
      "_nItemCount": 41,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/36990",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/686f2a130c551.png"
    },
    {
      "_idRow": 30255,
      "_sName": "Danjin",
      "_nItemCount": 29,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30255",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c49eef2b5.png"
    },
    {
      "_idRow": 30253,
      "_sName": "Encore",
      "_nItemCount": 25,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30253",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c41aafe7c.png"
    },
    {
      "_idRow": 39624,
      "_sName": "Iuno",
      "_nItemCount": 35,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/39624"
    },
    {
      "_idRow": 30263,
      "_sName": "Jianxin",
      "_nItemCount": 34,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30263",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c6300cb95.png"
    },
    {
      "_idRow": 30264,
      "_sName": "Jinhsi",
      "_nItemCount": 95,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30264",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c65ae3201.png"
    },
    {
      "_idRow": 30256,
      "_sName": "Jiyan",
      "_nItemCount": 21,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30256",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c4cec9dfe.png"
    },
    {
      "_idRow": 30259,
      "_sName": "Lingyang",
      "_nItemCount": 10,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30259",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c56786bfb.png"
    },
    {
      "_idRow": 33764,
      "_sName": "Lumi",
      "_nItemCount": 16,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/33764",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/675b1120b010b.png"
    },
    {
      "_idRow": 37891,
      "_sName": "Lupa",
      "_nItemCount": 42,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/37891",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/686f2a1a391f8.png"
    },
    {
      "_idRow": 30258,
      "_sName": "Mortefi",
      "_nItemCount": 14,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30258",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c52684f89.png"
    },
    {
      "_idRow": 35119,
      "_sName": "Phoebe",
      "_nItemCount": 71,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/35119",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6812a40cb85a4.png"
    },
    {
      "_idRow": 38371,
      "_sName": "Phrolova",
      "_nItemCount": 44,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/38371",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/68ab24ab15f8f.png"
    },
    {
      "_idRow": 34733,
      "_sName": "Roccia",
      "_nItemCount": 20,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/34733",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6812a44645b98.png"
    },
    {
      "_idRow": 30250,
      "_sName": "Rover Female",
      "_nItemCount": 106,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30250",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c35cd412e.png"
    },
    {
      "_idRow": 30249,
      "_sName": "Rover Male",
      "_nItemCount": 75,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30249",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c30d33704.png"
    },
    {
      "_idRow": 30252,
      "_sName": "Sanhua",
      "_nItemCount": 50,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30252",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c3d32a078.png"
    },
    {
      "_idRow": 32220,
      "_sName": "Shorekeeper",
      "_nItemCount": 102,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/32220",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/66f8c47b49ee8.png"
    },
    {
      "_idRow": 30254,
      "_sName": "Taoqi",
      "_nItemCount": 26,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30254",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c451a74aa.png"
    },
    {
      "_idRow": 30248,
      "_sName": "Verina",
      "_nItemCount": 32,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30248",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c2db4c218.png"
    },
    {
      "_idRow": 30471,
      "_sName": "Xiangli Yao",
      "_nItemCount": 23,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30471",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/66bddde6d44ed.png"
    },
    {
      "_idRow": 30246,
      "_sName": "Yangyang",
      "_nItemCount": 36,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30246",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c230d99e1.png"
    },
    {
      "_idRow": 30261,
      "_sName": "Yinlin",
      "_nItemCount": 115,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30261",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c5b7aea39.png"
    },
    {
      "_idRow": 33791,
      "_sName": "Youhu",
      "_nItemCount": 6,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/33791",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6812a47de960d.png"
    },
    {
      "_idRow": 30260,
      "_sName": "Yuanwu",
      "_nItemCount": 11,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30260",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6683c591329e5.png"
    },
    {
      "_idRow": 36665,
      "_sName": "Zani",
      "_nItemCount": 45,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/36665",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6812a2f8ddacc.png"
    },
    {
      "_idRow": 30472,
      "_sName": "Zhezhi",
      "_nItemCount": 48,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/30472",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/66bdde0a65151.png"
    },
    {
      "_idRow": 31838,
      "_sName": "NPCs & Entities",
      "_nItemCount": 12,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/31838",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/66e0d90771ac5.png"
    },
    {
      "_idRow": 29493,
      "_sName": "Other",
      "_nItemCount": 75,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/29493",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6692c90cba314.png",
      "_special": true
    },
    {
      "_idRow": 29496,
      "_sName": "UI",
      "_nItemCount": 55,
      "_nCategoryCount": 0,
      "_sUrl": "https://gamebanana.com/mods/cats/29496",
      "_sIconUrl": "https://images.gamebanana.com/img/ico/ModCategory/6692c913ddf00.png",
      "_special": true
    }
  ]