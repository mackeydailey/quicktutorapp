package com.quicktutor.quicktutor; /**
 * Created by mackeydailey on 5/11/17.
 */

import com.android.volley.Response;
import com.android.volley.toolbox.StringRequest;
import java.util.Map;
import java.util.HashMap;


public class RegisterRequest extends StringRequest {

    //TODO
    private static final String REGISTER_REQUEST_URL = "_______TODO_______";
    private Map<String, String> params;

    public RegisterRequest(String email, String password, String firstName, String lastName, Response.Listener<String> listener) {
        super(Method.POST, REGISTER_REQUEST_URL, listener, null);
        params = new HashMap<>();
        params.put("email", email);
        params.put("password", password);
        params.put("firstname", firstName);
        params.put("lastname", lastName);
    }

    @Override
    public Map<String, String> getParams() {
        return params;
    }
}
