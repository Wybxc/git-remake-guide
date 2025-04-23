// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="index.html">Git 重学指南</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded "><a href="安装/index.html"><strong aria-hidden="true">1.</strong> 安装</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="安装/下载.html"><strong aria-hidden="true">1.1.</strong> 下载</a></li><li class="chapter-item expanded "><a href="安装/配置.html"><strong aria-hidden="true">1.2.</strong> 配置</a></li></ol></li><li class="chapter-item expanded "><a href="储存库/index.html"><strong aria-hidden="true">2.</strong> 储存库</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="储存库/创建储存库.html"><strong aria-hidden="true">2.1.</strong> 创建储存库</a></li><li class="chapter-item expanded "><a href="储存库/管理暂存区.html"><strong aria-hidden="true">2.2.</strong> 管理暂存区</a></li><li class="chapter-item expanded "><a href="储存库/提交更改.html"><strong aria-hidden="true">2.3.</strong> 提交更改</a></li><li class="chapter-item expanded "><a href="储存库/查看历史.html"><strong aria-hidden="true">2.4.</strong> 查看历史</a></li><li class="chapter-item expanded "><a href="储存库/撤销操作.html"><strong aria-hidden="true">2.5.</strong> 撤销操作</a></li></ol></li><li class="chapter-item expanded "><a href="远程和分支/index.html"><strong aria-hidden="true">3.</strong> 远程和分支</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="远程和分支/分支基础.html"><strong aria-hidden="true">3.1.</strong> 分支基础</a></li><li class="chapter-item expanded "><a href="远程和分支/创建和切换分支.html"><strong aria-hidden="true">3.2.</strong> 创建和切换分支</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.3.</strong> 合并分支</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.4.</strong> 解决冲突</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.5.</strong> 远程仓库操作</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.6.</strong> 标签管理</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.7.</strong> 使用 ssh-agent</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.</strong> 协作工作流</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">4.1.</strong> GitHub Flow</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.2.</strong> Trunk-Based Flow</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.3.</strong> 变基</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.4.</strong> cherry-pick</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.5.</strong> Pull Request</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.6.</strong> 保护分支策略</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.7.</strong> CODEOWNERS</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.</strong> 项目管理</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">5.1.</strong> submodule</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.2.</strong> subtree</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.3.</strong> CI/CD</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.</strong> 杂项</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">6.1.</strong> Git LFS</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.2.</strong> Hooks</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.3.</strong> Git 内部原理</div></li></ol></li><li class="chapter-item expanded "><li class="spacer"></li><li class="chapter-item expanded "><div><strong aria-hidden="true">7.</strong> 附录</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">7.1.</strong> 语义化版本</div></li><li class="chapter-item expanded "><a href="附录/约定式提交.html"><strong aria-hidden="true">7.2.</strong> 约定式提交</a></li><li class="chapter-item expanded "><a href="附录/gitmoji-速查表.html"><strong aria-hidden="true">7.3.</strong> gitmoji 速查表</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
