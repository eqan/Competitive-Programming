#include <iostream>
#include <stack>
#include <queue>
#include <string>
#include <bitset>

using namespace std;

int main()
{
	int n;
	string input = "";
	stack<char> obj;
	queue<int> maxLengths, numberOfSubstring;
	int maxLength, tempLength, numberOfSubstrings,numberOfMaxSubstrings;
	cin >> n;
		for(int z=0; z< n; z++)
		{
			while(!obj.empty())
			{
				obj.pop();
			}
			maxLength = tempLength = numberOfSubstrings = 0;
			numberOfMaxSubstrings = 0;
			cin >> input;
			unsigned int stringSize = input.length();
			for (unsigned int i = 0; i< stringSize; i++)
			{
				if (input[i] == '(')
				{
					obj.push(input[i]);
				}
				else if (!obj.empty() && obj.top() == '(' && input[i] == ')')
				{
					tempLength+=2;
					obj.pop();
				}
				if (!obj.empty() && tempLength > 0 && input[i] == '('  )
				{
					numberOfSubstrings++;
					if (tempLength > maxLength)
						maxLength = tempLength;
					
					tempLength = 0;
				}
			}
			tempLength = 0;
			for (unsigned int i = 0; i< stringSize; i++)
			{
			if (input[i] == '(')
				{
			
					obj.push(input[i]);
				}
				else if ((!obj.empty() && obj.top() == '(' && input[i] == ')') )
				{
					tempLength+=2;
					obj.pop();
				}
				if ((!obj.empty() && tempLength > 0 && input[i] == '(' ) || (obj.empty() && input[i] == ')'))
				{
					if(tempLength == maxLength)
						numberOfMaxSubstrings++;
						if(input[i]=='(' || (input[i+1]!= ')' && i+1 < stringSize))
							tempLength = 0;
				}
			}
			if(numberOfSubstrings > 0)
			{
				maxLengths.push(maxLength);
				numberOfSubstring.push(numberOfMaxSubstrings);	
			}
			else
			{
				maxLengths.push(0);
				numberOfSubstring.push(1);	
			}
		}
		while(!maxLengths.empty())
		{
			cout << maxLengths.front()  << ' ' << numberOfSubstring.front() << '\n';
			maxLengths.pop();
			numberOfSubstring.pop();
		}	
	
	return 0;
}
