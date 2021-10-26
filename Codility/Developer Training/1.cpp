// you can use includes, for example:
// #include <algorithm>

// you can write to stdout for debugging purposes, e.g.
// cout << "this is a debug message" << endl;

int returnDay1(string S)
{
	if(S == "Mon")
		return 1;
    else if(S == "Tue")
		return 2;
    else if(S == "Wed")
		return 3;
    else if(S == "Thu")
		return 4;
    else if(S == "Fri")
		return 5;
    else if(S == "Sat")
		return 6;
    else if(S == "Sun")
		return 7;
    return 0;
}

string returnDay2(int S)
{
	switch(S)
	{
		case 1:
			return "Mon";
		case 2:
			return "Tue";
		case 3:
			return "Wed";
		case 4:
			return "Thu";
		case 5:
			return "Fri";
		case 6:
			return "Sat";
		case 7:
			return "Sun";
	}
	return "";
}

string solution(string &S, int K) {

	int totalDays = returnDay1(S) + K;
	return returnDay2(totalDays%7);
}

