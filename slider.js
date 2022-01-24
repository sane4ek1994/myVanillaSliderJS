function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {

    let slideIndex = 1,
        offset = 0;

    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container), // Получаем слайдер для добавления крошек
          prev = document.querySelector(prevArrow),
          next =document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slideWrapper = document.querySelector(wrapper),
          slidesFlied = document.querySelector(field),
          width = window.getComputedStyle(slideWrapper).width; // получ ширину элемента с помощью глобального объекта


    function  addZeroSlides(elem, slideNum) {
        if (slides.length < 10) {
            elem.textContent = `0${slideNum}`;
        } else {
            elem.textContent = slideNum;
        }
    }

    addZeroSlides(total, slides.length);
    addZeroSlides(current, slideIndex);

    slidesFlied.style.width = 100 * slides.length + '%'; // создаем видимую оболочку
    slidesFlied.style.display = 'flex'; // Ставить слайды горизонтально
    slidesFlied.style.transition = '0.5s all';  // Добавляем плавную анимацию

    slideWrapper.style.overflow = 'hidden'; // Прячем лишние слайды

    slides.forEach(slide => {  // Добавляем слайдам нужную ширину
    slide.style.width = width;
    });

    // Добавляем хлебные крошки

    slider.style.position = 'relative';
    const indicators = document.createElement('ol'),
          dots = [];

    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li'); // Создаем элементы в ol
        dot.setAttribute('data-slide-to', i + 1); // Устанавливаем атрибут в li
        dot.style.cssText = ` 
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;                        // Добавляем стили dot

        if (i == 0) { // Добавляем выделение выбранному элементу
            dot.style.opacity = 1;
        }

        indicators.append(dot); // Добавляем dot на страницу в indicators
        dots.push(dot); // Пушим dot в массив для добаления порядкового номера
    }


    function showDotsOpacity(dots) { // функция выделения выбранных точек
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;
        }

        function deleteNotDigits(str) { // создаем функцию для удоления букв с помощью регВыр.
            return +str.replace(/\D/g, '');
        }

        next.addEventListener('click', () => {
            if (offset == deleteNotDigits(width) * (slides.length -1)) { // Расчитываем нужные px
                offset = 0;
            } else {
                offset += deleteNotDigits(width);
            }

            slidesFlied.style.transform = `translateX(-${offset}px)`;

            if (slideIndex == slides.length) { // Условие переключения последнего слайда
                slideIndex = 1;
            } else {
                slideIndex++;
            }


            addZeroSlides(current, slideIndex);
            showDotsOpacity(dots);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length -1);
        } else {
            offset -= deleteNotDigits(width);
        }

        slidesFlied.style.transform = `translateX(-${offset}px)`;
        
        if (slideIndex == 1) { // Условие переключения первого слайда
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addZeroSlides(current, slideIndex);
        showDotsOpacity(dots);
    });

    dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to'); // Добавляем атрибут c номером элементу 

        slideIndex = slideTo; //  присваиваем текущюю точку slideIndex
        offset = deleteNotDigits(width) * (slideTo - 1); // Используем класс не числа \D

        slidesFlied.style.transform = `translateX(-${offset}px)`;

        addZeroSlides(current, slideIndex);
        showDotsOpacity(dots);
    });
    });
}