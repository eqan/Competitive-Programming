// you can use includes, for example:
// #include <algorithm>

// you can write to stdout for debugging purposes, e.g.
// cout << "this is a debug message" << endl;
#include <string>
#include <stack>

int solution(int N) {
    string result = to_string(N);
    stack<string> results;
    for(uint32_t i=0; i < result.length(); i++)
    {
        if(result[i] == '5')
        {
            string temp = result;
            temp.erase(i,1);
            results.push(temp);
        }
    }
    int maximum =INT32_MIN;
    for(uint32_t i =0; i<= results.size(); i++)
    {
        int temp_number = stoi(results.top());
        if(maximum < temp_number )
        {
            maximum = temp_number;
            results.pop();
        }
    }
    return maximum;
}
