/*
    Time Complexity: O(N)
	Space Complexity: O(N)
    
	Where 'N' denotes length of the input string.
*/

#include <stack>
#include <limits.h>

void longestRegularBracket(string inputString, int &length, int &count)
{

	int n = inputString.length();

    /*
	    Arrays for storing the indices of 
	    opening and closing brackets.
	*/
	int closing[n + 1], opening[n + 1];

    // Initializing arrays with INT_MAX.
	for (int i = 0; i <= n; i++)
	{
		closing[i] = INT_MAX;
		opening[i] = INT_MAX;
	}

	stack<int> s;

	for (int i = 0; i < n; i++)
	{
		if (inputString[i] == ')')
		{
			if (!s.empty())
			{
				int top = s.top();
				s.pop();
				opening[i] = top;

				// Closing bracket index will be atleast this.
				closing[i] = top;	

				// Opening bracket should be as left as possible for maximum length.				   
				closing[i] = min(closing[opening[i] - 1], closing[i]);
			}
		}

		else
		{
			s.push(i);
		}
	}

	for (int i = 0; i < n; i++)
	{
		if (inputString[i] == ')')
		{

			// Calculating the length with the help of indices stored in closing[].
			if (i - closing[i] + 1 > length)
			{
				length = i - closing[i] + 1;
				count = 1;
			}

			else if (i - closing[i] + 1 == length)
			{
				count++;
			}
		}
	}
	
	// If length of longest regular bracket subsequence is 0 then make count = 1.
	if (length == 0)
	{
		count = 1;
	}

}
