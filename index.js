const originalTitle = document.title;

function extractDetail(node) {
    const detail = node.querySelector("div#details.style-scope.ytd-macro-markers-list-item-renderer").children;
    return {
      name: detail[0].textContent,
      startAt: detail[1].textContent,
    };
}

const chapterGuideRegion = () => document.querySelector("div#contents.style-scope.ytd-macro-markers-list-renderer");
const chapterItermsRegion = () => chapterGuideRegion().children;
const chapterItems = () => Array.from(chapterItermsRegion());

function getCurrentChapter() {
  let iterable = chapterItems();
  // Passeiing time will never be updated unless the cursor hovers on the youtube player.
  // So I must check it everytime.
  let currentChapter = iterable.filter(x => x.getAttribute('active') !== null)[0];
  return currentChapter;
}

const currentChapterTitle = currentChapter => `${originalTitle}[♪ ${extractDetail(currentChapter).name}]`;

function overwriteTitle() {
  const currentChapter = getCurrentChapter();
  const newTitle = currentChapterTitle(currentChapter);
  document.title = newTitle;
};

const ms = 1;
const sec = 1000 * ms;

function main() {
  setTimeout(() => {  // SO SAD.
    if (chapterGuideRegion() === null) return;
    setInterval(overwriteTitle, 1 * sec);
  }, 2 * sec);
}

main();