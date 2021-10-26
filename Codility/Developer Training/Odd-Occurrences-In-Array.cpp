#include <bits/stdc++.h>
#include <vector>
using namespace std;

void sort(vector<int>& v)
{
	sort(v.begin(), v.end());
}

int solution(vector<int> &A)
{
	sort(A);
	int result = INT32_MIN;
	int lastValue = INT32_MIN;
	bool check = false;
	for(uint32_t i=0; i < A.size(); i++)
	{
		if(!check)
		{
			check = true;
			lastValue = A[i];
		}
		else if(check && lastValue == A[i])
		{
				lastValue = -1;
				check = false;
		}
		else if(check && lastValue != A[i])
		{
				if(result == INT32_MIN)
					result = lastValue;
				else
					result = lastValue;
				check = false;
				lastValue = -1;
		}
	}
   return result;
}

