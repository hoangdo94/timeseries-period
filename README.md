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

## **Một số kết quả** ##
