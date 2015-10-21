#Khai phá tính chu kỳ trong dữ liệu thời gian

> **GVHD**: Thầy TRẦN MINH QUANG
> **Sinh viên:** ĐỖ NGUYỄN KHÁNH HOÀNG
> **MSSV:** 51201200

----------

## **Đề xuất giải thuật**
### Ý tưởng

Sử dụng giải thuật theo hướng brute-force để giải quyết cái yêu cầu của bài toán:

 - Lần lượt thử các chu kỳ ***p*** (từ $1$ tới $n/2$)
 - Với mỗi chu kỳ, thử lần lượt các điểm bắt đầu ***s*** có thể (từ $1$ tới $n - p$)
 - Với mỗi bộ giá trị ***p***, ***s***, tính độ hỗ trợ (support) ***c***

### Pseudocode
 

    function findPeriod
	    input: timeseries, threshold
	    output: period, start index, support
	begin
		var c
		for p := 1 to n/2
			for s:= 0 to n - p
				c := support(timeseries, p, s)
				if (c > threshold) then
					return {p, s, c}
				end if
	end 


## **Độ phức tạp của giải thuật**
Giải thuật sử dụng 2 vòng lặp lồng nhau, trong đó mỗi vòng lặp có độ phức tạp $O(n)$, và giải thuật tính support cũng có độ phức tạp $O(n)$. 
Vì vậy, độ phức tạp của giải thuật là $O(n^3)$

## **Hiện thực giải thuật**

> Hiện thực giải thuật bằng javscript, có thể sử dụng trực tiếp trên website

    //Tính support
    function sup(timeseries, p, s) {
    	var proj = '';
    	for (var i = s; i<timeseries.length; i+=p) {
    		proj += timeseries[i];
    	}
    	var z = 0;
    	for (var i=1; i<proj.length; i++) {
    		if (proj[i] === '1' && proj[i-1] === '1') z++;
    	}
    	return z/(proj.length - 1);
    }
    
    //Tìm chu kỳ, trả về kết quả
    function findPeriod(timeseries, threshold) {
        var n = timeseries.length;
        for (var p=1; p<=n/2; p++) {
        	for (var s=0; s< n-p; s++) {
        		var c = sup(timeseries, p ,s);
        		if (100*c > threshold) {
        			return {
        				p: p,
        				s: s,
        				c: c,
        			}
        		}
        	}
        }
    }

## **Nhận xét về giải thuật** ##

 - Độ phức tạp còn cao ($O(n^3)$) nên chỉ dùng được với các tập dữ liệu vừa và nhỏ
 - Vì giải thuật sử dụng brute-force và dừng lại khi tìm được giá trị thõa mức threshold nên có thể dẫn đến sự tối ưu cục bộ (không trả về được bộ giá trị tốt nhất)

## **Một số kết quả** ##
> Có thể sử dụng ứng dụng trực tiếp (webapp) tại: http://hoangdo94.github.io/timeseries-period

|Input (timeseries, threshold)|Output (period, start index, support)|
|--------|:-------|
|1001001001001, 99%|3, 0, 100%|
|011001001101101, 90%|2, 12, 100%|
|0001110101010011010101111100011101, 80%| 2, 29, 100%|
|0101010110001010101011110101110001111, 50%|1, 27, 55.56%|
|0101010110001010101011110101110001111, 60%|1, 32, 75%|

