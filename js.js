document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("dm");
    const body = document.getElementById("bod");
    const tables = document.querySelectorAll("table");

    let darkMode = false; // حالة تتبع الوضع الحالي

    toggleButton.addEventListener("click", function () {
        if (!darkMode) {
            // تفعيل الوضع المظلم
            body.style.backgroundColor = "black";
            body.style.color = "white";

            tables.forEach(function (table) {
                table.style.color = "white";
                table.style.backgroundColor = "black";
            });

            darkMode = true;
        } else {
            // الرجوع إلى الوضع المضيء
            body.style.backgroundColor = "white";
            body.style.color = "black";

            tables.forEach(function (table) {
                table.style.color = "black";
                table.style.backgroundColor = "white";
            });

            darkMode = false;
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("sherche");
    const cardsContainer = document.querySelector(".cards");
    const alertElement = document.getElementById("alarte");

    searchInput.addEventListener("input", function () {
        const filter = searchInput.value.trim().toLowerCase();
        const sections = document.querySelectorAll(".prt");
        let anyMatch = false;

        sections.forEach(section => {
            const title = section.querySelector(".tprt").textContent.toLowerCase();
            const tableRows = section.querySelectorAll("table tr");
            let sectionVisible = false;

            for (let i = 1; i < tableRows.length; i++) {
                const cells = tableRows[i].querySelectorAll("td");
                const subject = cells[0].textContent.toLowerCase();
                const match = title.includes(filter) || subject.includes(filter);
                tableRows[i].style.display = match ? "" : "none";
                if (match) {
                    sectionVisible = true;
                    anyMatch = true;
                }
            }

            section.style.display = sectionVisible ? "" : "none";
        });

        if (!anyMatch) {
            alertElement.setAttribute("role", "alert");
            alertElement.setAttribute("aria-live", "assertive");
            alertElement.textContent = "لا توجد نتائج مطابقة لبحثك.";

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        } else {
            alertElement.textContent = "المحاضرات والتطبيقات";
            alertElement.removeAttribute("role");
            alertElement.removeAttribute("aria-live");
        }
    });

    searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const sections = document.querySelectorAll(".prt");

            for (let section of sections) {
                if (section.style.display !== "none") {
                    const rows = section.querySelectorAll("table tr");
                    for (let i = 1; i < rows.length; i++) {
                        if (rows[i].style.display !== "none") {
                            rows[i].scrollIntoView({ behavior: "smooth", block: "center" });
                            rows[i].focus();
                            return;
                        }
                    }
                    section.querySelector(".tprt").scrollIntoView({ behavior: "smooth", block: "center" });
                    section.querySelector(".tprt").focus();
                    return;
                }
            }
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menu-btn");
    const sidebar = document.getElementById("sidebar");
    const originalDarkModeBtn = document.getElementById("dm");
    const originalSearchInput = document.getElementById("sherche");
    const alertElement = document.getElementById("alarte");
    const body = document.getElementById("bod");
    const tables = document.querySelectorAll("table");

    let darkMode = false;

    // تفريغ الشريط الجانبي
    sidebar.innerHTML = "";

    // إنشاء div.logo
    const logoDiv = document.createElement("div");
    logoDiv.className = "logo";
    const span1 = document.querySelector(".logo span:first-child").cloneNode(true);
    const logoImg = document.getElementById("lo").cloneNode(true);
    const span2 = document.querySelector(".logo span:last-child").cloneNode(true);
    logoDiv.append(span1, logoImg, span2);

    // إنشاء div.sd
    const sdDiv = document.createElement("div");
    sdDiv.className = "sd";

    // نسخ حقل البحث
    const searchInput = originalSearchInput.cloneNode(true);
    searchInput.id = "sherche-clone"; // تجنب تضارب ID

    // نسخ div.nvm بالكامل
    const navButtons = document.querySelector(".nvm").cloneNode(true);
    const newDarkModeBtn = navButtons.querySelector("#dm");
    newDarkModeBtn.id = "dm-clone"; // تجنب تضارب ID

    // وظيفة الوضع المظلم
    function toggleDarkMode() {
        darkMode = !darkMode;

        if (darkMode) {
            body.style.backgroundColor = "black";
            body.style.color = "white";
            tables.forEach(table => {
                table.style.color = "white";
                table.style.backgroundColor = "black";
            });
        } else {
            body.style.backgroundColor = "white";
            body.style.color = "black";
            tables.forEach(table => {
                table.style.color = "black";
                table.style.backgroundColor = "white";
            });
        }
    }

    // ربط الزرين معًا بنفس الوظيفة
    originalDarkModeBtn.addEventListener("click", toggleDarkMode);
    newDarkModeBtn.addEventListener("click", toggleDarkMode);

    // وظيفة البحث
    function handleSearch(inputElement) {
        inputElement.addEventListener("input", () => {
            const filter = inputElement.value.trim().toLowerCase();
            const sections = document.querySelectorAll(".prt");
            let anyMatch = false;

            sections.forEach(section => {
                const title = section.querySelector(".tprt").textContent.toLowerCase();
                const rows = section.querySelectorAll("table tr");
                let sectionVisible = false;

                for (let i = 1; i < rows.length; i++) {
                    const subject = rows[i].querySelectorAll("td")[0].textContent.toLowerCase();
                    const match = title.includes(filter) || subject.includes(filter);
                    rows[i].style.display = match ? "" : "none";
                    if (match) {
                        sectionVisible = true;
                        anyMatch = true;
                    }
                }

                section.style.display = sectionVisible ? "" : "none";
            });

            if (!anyMatch) {
                alertElement.setAttribute("role", "alert");
                alertElement.setAttribute("aria-live", "assertive");
                alertElement.textContent = "لا توجد نتائج مطابقة لبحثك.";
                setTimeout(() => window.location.reload(), 3000);
            } else {
                alertElement.textContent = "المحاضرات والتطبيقات";
                alertElement.removeAttribute("role");
                alertElement.removeAttribute("aria-live");
            }
        });

        inputElement.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                const sections = document.querySelectorAll(".prt");

                for (let section of sections) {
                    if (section.style.display !== "none") {
                        const rows = section.querySelectorAll("table tr");
                        for (let i = 1; i < rows.length; i++) {
                            if (rows[i].style.display !== "none") {
                                rows[i].scrollIntoView({ behavior: "smooth", block: "center" });
                                rows[i].focus();
                                return;
                            }
                        }
                        section.querySelector(".tprt").scrollIntoView({ behavior: "smooth", block: "center" });
                        section.querySelector(".tprt").focus();
                        return;
                    }
                }
            }
        });
    }

    // ربط كلا الحقلين بالبحث
    handleSearch(originalSearchInput);
    handleSearch(searchInput);

    // تجميع عناصر sd
    sdDiv.append(searchInput, navButtons);

    // وضع العناصر في الشريط الجانبي
    sidebar.append(logoDiv, sdDiv);

    // إظهار القائمة الجانبية
    menuBtn.addEventListener("click", () => {
        sidebar.style.marginRight = "0%";
    });
    //تفعيل الزر باستعمال مفتاح الادخال:

menuBtn.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault(); // لمنع تمرير الصفحة عند الضغط على Space
        sidebar.style.marginRight = "0%";
    }
});

    // إخفاء القائمة عند الضغط خارجها
    document.addEventListener("click", (event) => {
        if (!sidebar.contains(event.target) && event.target !== menuBtn) {
            sidebar.style.marginRight = "-100%";
        }
    });
});
